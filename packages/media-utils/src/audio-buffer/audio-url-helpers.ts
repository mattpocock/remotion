import {audioBufferToWav} from './audio-buffer-to-wav';

/**
 * This API takes an AudioBuffer instance and converts it to a Base 64 Data URL so it can be passed to an <Audio /> tag.
 * part of @remotion/media-utils
 * @see [Documentation](https://www.remotion.dev/docs/audio-buffer-to-data-url)
 */
export const audioBufferToDataUrl = (buffer: AudioBuffer) => {
	const wavAsArrayBuffer = audioBufferToWav(buffer, {
		float32: true,
	});
	let binary = '';
	const bytes = new Uint8Array(wavAsArrayBuffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}

	return 'data:audio/wav;base64,' + window.btoa(binary);
};
