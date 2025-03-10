import type React from 'react';
import type {LoopVolumeCurveBehavior} from '../audio/use-audio-frame.js';
import type {VolumeProp} from '../volume-prop.js';

export type RemotionMainVideoProps = {
	startFrom?: number;
	endAt?: number;
	/**
	 * @deprecated Only for internal `transparent` use
	 */
	_remotionInternalNativeLoopPassed?: boolean;
	_remotionDebugSeeking?: boolean;
};

export type RemotionVideoProps = Omit<
	React.DetailedHTMLProps<
		React.VideoHTMLAttributes<HTMLVideoElement>,
		HTMLVideoElement
	>,
	'autoPlay' | 'controls' | 'onEnded' | 'nonce'
> & {
	name?: string;
	volume?: VolumeProp;
	playbackRate?: number;
	acceptableTimeShiftInSeconds?: number;
	allowAmplificationDuringRender?: boolean;
	toneFrequency?: number;
	pauseWhenBuffering?: boolean;
	showInTimeline?: boolean;
	delayRenderTimeoutInMilliseconds?: number;
	loopVolumeCurveBehavior?: LoopVolumeCurveBehavior;
	delayRenderRetries?: number;
};

type DeprecatedOffthreadVideoProps = {
	/**
	 * @deprecated Use the `transparent` prop instead
	 */
	imageFormat?: never;
};

export type OffthreadVideoProps = {
	src: string;
	className?: string;
	name?: string;
	id?: string;
	style?: React.CSSProperties;
	volume?: VolumeProp;
	playbackRate?: number;
	muted?: boolean;
	onError?: React.ReactEventHandler<HTMLVideoElement | HTMLImageElement>;
	acceptableTimeShiftInSeconds?: number;
	allowAmplificationDuringRender?: boolean;
	toneFrequency?: number;
	transparent?: boolean;
	toneMapped?: boolean;
	pauseWhenBuffering?: boolean;
	loopVolumeCurveBehavior?: LoopVolumeCurveBehavior;
	delayRenderTimeoutInMilliseconds?: number;
	/**
	 * @deprecated For internal use only
	 */
	stack?: string;
	showInTimeline?: boolean;
} & RemotionMainVideoProps &
	DeprecatedOffthreadVideoProps;
