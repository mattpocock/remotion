import execa from 'execa';
import type {DownloadMap} from './assets/download-map';
import {getAudioChannelsAndDuration} from './assets/get-audio-channels';
import type {MediaAsset} from './assets/types';
import {calculateFfmpegFilter} from './calculate-ffmpeg-filters';
import {getExecutablePath} from './compositor/get-executable-path';
import {makeFfmpegFilterFile} from './ffmpeg-filter-file';
import {pLimit} from './p-limit';
import {resolveAssetSrc} from './resolve-asset-src';

type Options = {
	outName: string;
	asset: MediaAsset;
	expectedFrames: number;
	fps: number;
	downloadMap: DownloadMap;
};

const preprocessAudioTrackUnlimited = async ({
	outName,
	asset,
	expectedFrames,
	fps,
	downloadMap,
}: Options): Promise<string | null> => {
	const {channels, duration} = await getAudioChannelsAndDuration(
		downloadMap,
		resolveAssetSrc(asset.src)
	);

	const filter = calculateFfmpegFilter({
		asset,
		durationInFrames: expectedFrames,
		fps,
		channels,
		assetDuration: duration,
	});

	if (filter === null) {
		return null;
	}

	const {cleanup, file} = await makeFfmpegFilterFile(filter, downloadMap);

	const args = [
		['-i', resolveAssetSrc(asset.src)],
		['-ac', '2'],
		['-filter_script:a', file],
		['-c:a', 'pcm_s16le'],
		['-y', outName],
	].flat(2);

	await execa(getExecutablePath('ffmpeg'), args, {
		cwd: getExecutablePath('ffmpeg-cwd'),
	});

	cleanup();
	return outName;
};

const limit = pLimit(2);

export const preprocessAudioTrack = (options: Options) => {
	return limit(preprocessAudioTrackUnlimited, options);
};
