import type {MouseEventHandler} from 'react';
import React, {useState, useCallback, useMemo} from 'react';
import {BACKGROUND, CLEAR_HOVER, LIGHT_TEXT} from '../helpers/colors';
import {Row, Spacing} from './layout';
import type {StaticFile} from 'remotion';
import {FileIcon} from '../icons/file';
import {ExpandedFolderIconSolid} from '../icons/folder';
import type {RenderInlineAction} from './InlineAction';
import {InlineAction} from './InlineAction';
import {openInFileExplorer} from './RenderQueue/actions';
import {sendErrorNotification} from './Notifications/NotificationCenter';

const COMPOSITION_ITEM_HEIGHT = 32;

const itemStyle: React.CSSProperties = {
	paddingRight: 10,
	paddingTop: 6,
	paddingBottom: 6,
	fontSize: 13,
	display: 'flex',
	textDecoration: 'none',
	cursor: 'default',
	alignItems: 'center',
	marginBottom: 1,
	appearance: 'none',
	border: 'none',
	width: '100%',
	textAlign: 'left',
	backgroundColor: BACKGROUND,
	height: COMPOSITION_ITEM_HEIGHT,
};

const labelStyle: React.CSSProperties = {
	textAlign: 'left',
	textDecoration: 'none',
	fontSize: 13,
	flex: '1 1 0%',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};

const iconStyle: React.CSSProperties = {
	width: 18,
	height: 18,
	flexShrink: 0,
};

const revealIconStyle: React.CSSProperties = {
	height: 12,
	color: 'currentColor',
};

export const AssetSelectorItem: React.FC<{
	item: StaticFile;
	tabIndex: number;
}> = ({item, tabIndex}) => {
	const [hovered, setHovered] = useState(false);
	const onPointerEnter = useCallback(() => {
		setHovered(true);
	}, []);

	const onPointerLeave = useCallback(() => {
		setHovered(false);
	}, []);

	const style: React.CSSProperties = useMemo(() => {
		return {
			...itemStyle,
			backgroundColor: hovered ? CLEAR_HOVER : 'transparent',
			paddingLeft: 12,
			color: hovered ? 'white' : LIGHT_TEXT,
		};
	}, [hovered]);

	const label = useMemo(() => {
		return {
			...labelStyle,
			color: hovered ? 'white' : LIGHT_TEXT,
		};
	}, [hovered]);

	const onClick: MouseEventHandler = useCallback(() => {
		console.log('Clicked', item);
	}, [item]);

	const renderAction: RenderInlineAction = useCallback((color) => {
		return <ExpandedFolderIconSolid style={revealIconStyle} color={color} />;
	}, []);

	const revealInExplorer = React.useCallback(() => {
		openInFileExplorer({
			directory: 'public/' + item.name,
		}).catch((err) => {
			sendErrorNotification(`Could not open file: ${err.message}`);
		});
	}, [item.name]);

	return (
		<Row align="center">
			<button
				style={style}
				onPointerEnter={onPointerEnter}
				onPointerLeave={onPointerLeave}
				tabIndex={tabIndex}
				onClick={onClick}
				type="button"
				title={item.name}
			>
				<FileIcon style={iconStyle} color={hovered ? 'white' : LIGHT_TEXT} />
				<Spacing x={1} />
				<div style={label}>{item.name}</div>
				<Spacing x={0.5} />
				<InlineAction renderAction={renderAction} onClick={revealInExplorer} />
			</button>
		</Row>
	);
};
