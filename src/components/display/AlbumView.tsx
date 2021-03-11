import { NextPage } from 'next';
import React from 'react';
import { Flex, Grid, Spacer } from '@chakra-ui/react';

import { AlbumViewItem } from './AlbumViewItem';

interface Props {
	album: Album;
	files: FileShort[];
}

export const AlbumView: NextPage<Props> = (_props: Props) => {
	const file_list: JSX.Element[] = [];
	if(_props.files && (_props.files.length > 0)) {
		_props.files.forEach((_element: FileShort, _i) => {
			file_list.push(
				<>
					<AlbumViewItem file={_element} key={_element.file_id} />
					<Spacer backgroundColor='grey' borderRadius='3xl' height='2px' />
				</>
			);
		});
	}
	return(
		<Flex as={Grid} width='100%' alignContent='center' justifyContent='center' gridGap={4}
			flexDirection='row' flexWrap='wrap'>
			{ file_list }
		</Flex>
	);
};