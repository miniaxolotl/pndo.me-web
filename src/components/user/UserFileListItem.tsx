import { NextPage } from 'next';
import React from 'react';
import { Flex, Grid } from '@chakra-ui/react';

interface Props {
	files: FileShort[];
}

export const UserFileListItem: NextPage<Props> = (_props: Props) => {
	const file_list: JSX.Element[] = [];
	if(_props.files && (_props.files.length > 0)) {
		_props.files.forEach((_element: FileShort, _i) => {
			file_list.push(
				// <AlbumViewItem update_hook={_props.update_hook} file={_element} key={_element.file_id} />
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