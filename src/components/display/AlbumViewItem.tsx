import { FiFile, FiFilm, FiImage, FiVideo, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { NextPage } from 'next';
import React from 'react';
import { Link as CLink, Flex, GridItem, IconButton, Tag, Text } from '@chakra-ui/react';

import { config } from '../../res/config';

interface Props {
	file: FileShort;
}

export const AlbumViewItem: NextPage<Props> = (_props: Props) => {

	const full_url = `/file/${_props.file.file_id}`;

	let _icon = FiFile;
	if(_props.file.type.includes('image')) {
		_icon = FiImage;
	} else if(_props.file.type.includes('video')) {
		_icon = FiFilm;
	}

	return(
		<GridItem width='100%'>
			<Flex direction='row' alignItems='center' justifyContent='space-between'>
				<CLink as={Link} href={full_url}>
					<Flex as='a'  _hover={{ cursor: 'pointer' }} width='min-content'>
						<IconButton as={_icon} size='lg' aria-label='file icon' background='none'
							_hover={{ background: 'none' }}/>
						<Text overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>
							{ _props.file.filename }
						</Text>
					</Flex>
				</CLink>
				{/* <IconButton as={FiX} size='xs' aria-label='file icon' /> */}
			</Flex>
		</GridItem>
	);
};