import { NextPage } from 'next';
import React from 'react';
import { Flex, Text, useColorMode } from '@chakra-ui/react';

import { FileListItem } from './FileListItem';

import style from './FileList.module.css';

interface Props {
	placeholder?: string;
	file_list: FileShort[];
}

export const FileList: NextPage<Props> = (_props: Props) => {
	const { colorMode } = useColorMode();
	const file_list: JSX.Element[] = [];
	if(_props.file_list && (_props.file_list.length > 0)) {
		_props.file_list.forEach((_element: FileState, _i) => {
			file_list.push(
				<FileListItem file={_element} key={_element.temp_id} ></FileListItem>
			);
		});
	}
	
	return(
		<Flex borderRadius='md' direction='column' justifyItems='center' textAlign='center' shadow='dark-lg'
			className={colorMode === 'dark' ? style.container : style.containerLight}>
			{ file_list.length ? file_list : <Text _hover={{ cursor: 'default' }}> {_props.placeholder} </Text> }
		</Flex>
	);
};

FileList.defaultProps = {
	placeholder: 'Drag and drop to start uploading... '
};