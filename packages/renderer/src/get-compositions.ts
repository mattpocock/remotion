import type {AnyCompMetadata} from 'remotion';
import type {DownloadMap} from './assets/download-map';
import {cleanDownloadMap, makeDownloadMap} from './assets/download-map';
import type {BrowserExecutable} from './browser-executable';
import type {BrowserLog} from './browser-log';
import type {HeadlessBrowser} from './browser/Browser';
import type {Page} from './browser/BrowserPage';
import {handleJavascriptException} from './error-handling/handle-javascript-exception';
import {findRemotionRoot} from './find-closest-package-json';
import {getPageAndCleanupFn} from './get-browser-instance';
import type {ChromiumOptions} from './open-browser';
import {prepareServer} from './prepare-server';
import {puppeteerEvaluateWithCatch} from './puppeteer-evaluate';
import {waitForReady} from './seek-to-frame';
import {setPropsAndEnv} from './set-props-and-env';
import {validatePuppeteerTimeout} from './validate-puppeteer-timeout';

type GetCompositionsConfig = {
	inputProps?: object | null;
	envVariables?: Record<string, string>;
	puppeteerInstance?: HeadlessBrowser;
	onBrowserLog?: (log: BrowserLog) => void;
	browserExecutable?: BrowserExecutable;
	timeoutInMilliseconds?: number;
	chromiumOptions?: ChromiumOptions;
	port?: number | null;
	/**
	 * @deprecated Only for Remotion internal usage
	 */
	downloadMap?: DownloadMap;
	/**
	 * @deprecated Only for Remotion internal usage
	 */
	indent?: boolean;
	verbose?: boolean;
};

const innerGetCompositions = async (
	serveUrl: string,
	page: Page,
	config: GetCompositionsConfig,
	proxyPort: number
): Promise<AnyCompMetadata[]> => {
	if (config?.onBrowserLog) {
		page.on('console', (log) => {
			config.onBrowserLog?.({
				stackTrace: log.stackTrace(),
				text: log.text,
				type: log.type,
			});
		});
	}

	validatePuppeteerTimeout(config?.timeoutInMilliseconds);

	await setPropsAndEnv({
		inputProps: config?.inputProps,
		envVariables: config?.envVariables,
		page,
		serveUrl,
		initialFrame: 0,
		timeoutInMilliseconds: config?.timeoutInMilliseconds,
		proxyPort,
		retriesRemaining: 2,
		audioEnabled: false,
		videoEnabled: false,
	});

	await puppeteerEvaluateWithCatch({
		page,
		pageFunction: () => {
			window.setBundleMode({
				type: 'evaluation',
			});
		},
		frame: null,
		args: [],
	});

	await waitForReady(page);
	const result = await puppeteerEvaluateWithCatch({
		pageFunction: () => {
			return window.getStaticCompositions();
		},
		frame: null,
		page,
		args: [],
	});

	return result as AnyCompMetadata[];
};

/**
 * @description Gets the compositions defined in a Remotion project based on a Webpack bundle.
 * @see [Documentation](https://www.remotion.dev/docs/renderer/get-compositions)
 */
export const getCompositions = async (
	serveUrlOrWebpackUrl: string,
	config?: GetCompositionsConfig
) => {
	const downloadMap = config?.downloadMap ?? makeDownloadMap();

	const {page, cleanup} = await getPageAndCleanupFn({
		passedInInstance: config?.puppeteerInstance,
		browserExecutable: config?.browserExecutable ?? null,
		chromiumOptions: config?.chromiumOptions ?? {},
	});

	return new Promise<AnyCompMetadata[]>((resolve, reject) => {
		const onError = (err: Error) => reject(err);
		const cleanupPageError = handleJavascriptException({
			page,
			frame: null,
			onError,
		});

		let close: ((force: boolean) => Promise<unknown>) | null = null;

		prepareServer({
			webpackConfigOrServeUrl: serveUrlOrWebpackUrl,
			onDownload: () => undefined,
			onError,
			port: config?.port ?? null,
			downloadMap,
			remotionRoot: findRemotionRoot(),
			concurrency: 1,
			verbose: config?.verbose ?? false,
			indent: config?.indent ?? false,
		})
			.then(({serveUrl, closeServer, offthreadPort}) => {
				close = closeServer;
				return innerGetCompositions(
					serveUrl,
					page,
					config ?? {},
					offthreadPort
				);
			})

			.then((comp): Promise<[AnyCompMetadata[], unknown]> => {
				if (close) {
					return Promise.all([comp, close(true)]);
				}

				return Promise.resolve([comp, null]);
			})
			.then(([comp]) => {
				return resolve(comp);
			})
			.catch((err) => {
				reject(err);
			})
			.finally(() => {
				cleanup();
				cleanupPageError();
				// Clean download map if it was not passed in
				if (!config?.downloadMap) {
					cleanDownloadMap(downloadMap);
				}
			});
	});
};
