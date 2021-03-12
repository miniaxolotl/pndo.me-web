import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
	url: string;
	type: string;
}

export const VideoPreview: React.FunctionComponent<Props> = (_props) => {
	return (
		<Flex as='video'  maxHeight='40vh' marginY='1rem' controls={true} 
			style={{ filter: 'drop-shadow(0.25rem 0.25rem 0.5rem #16161D)' }} >
			<source src={_props.url} type={_props.type} />
			Your browser does not support the video tag.
		</Flex>
	);
};