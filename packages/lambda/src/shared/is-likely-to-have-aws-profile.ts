import {existsSync, readFileSync} from 'fs';
import {homedir} from 'os';
import {join, sep} from 'path';

const homeDirCache: Record<string, string> = {};

const getHomeDirCacheKey = (): string => {
	// geteuid is only available on POSIX platforms (i.e. not Windows or Android).
	if (process && process.geteuid) {
		return `${process.geteuid()}`;
	}

	return 'DEFAULT';
};

const getHomeDir = (): string => {
	const {HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${sep}`} = process.env;

	if (HOME) return HOME;
	if (USERPROFILE) return USERPROFILE;
	if (HOMEPATH) return `${HOMEDRIVE}${HOMEPATH}`;

	const homeDirCacheKey = getHomeDirCacheKey();
	if (!homeDirCache[homeDirCacheKey]) homeDirCache[homeDirCacheKey] = homedir();

	return homeDirCache[homeDirCacheKey];
};

const ENV_CREDENTIALS_PATH = 'AWS_SHARED_CREDENTIALS_FILE';

// Logic is inline to https://github.com/smithy-lang/smithy-typescript/blob/main/packages/shared-ini-file-loader/src/getCredentialsFilepath.ts#L7
const pathOfCredentialsFile = () => {
	return (
		process.env[ENV_CREDENTIALS_PATH] ||
		join(getHomeDir(), '.aws', 'credentials')
	);
};

export const isLikelyToHaveAwsProfile = (): boolean => {
	const credentialsFile = pathOfCredentialsFile();
	if (!existsSync(credentialsFile)) {
		return false;
	}

	const content = readFileSync(credentialsFile, 'utf-8');
	return content.includes('[default]');
};
