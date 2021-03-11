import { NextPage } from 'next';
import React from 'react';
import filesize from 'file-size';

import { Badge, Flex, Tag, TagLabel } from '@chakra-ui/react';

import { AlbumView } from './AlbumView';


interface Props {
	album: Album;
	files: FileShort[];
}

export const DisplayAlbum: NextPage<Props> = (_props: Props) => {
	
	const date = new Date(_props.album.create_date);
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth();
	const day = date.getUTCDay() < 10 ? '0' + date.getUTCDay() : date.getUTCDay();
	const create_date = `${year}-${month}-${day}`;
	
	return(
		<Flex direction="column">
			<Flex marginTop="2rem" direction='column' gridGap={2}>
				<Flex gridGap={2} wrap='wrap' alignItems="center" justifyContent='center'>
					<Tag colorScheme="cyan" borderRadius="full" whiteSpace='nowrap' >
						{ filesize(parseInt(_props.album.bytes as any)).human('si') }
					</Tag>

					<Tag colorScheme="cyan" borderRadius="full" whiteSpace='nowrap' >
						{ create_date }
					</Tag>

					{(() => {
						if(_props.album.protected) {
							return (
								<>
									<Tag colorScheme='cyan' borderRadius="full" whiteSpace='nowrap' >
										<Badge colorScheme="yellow" borderRadius="full">
											{ _props.album.v_count}
										</Badge>
										<TagLabel> views </TagLabel>
									</Tag>
			
									<Tag colorScheme='cyan' borderRadius="full" whiteSpace='nowrap' >
										<Badge colorScheme="yellow" borderRadius="full">
											{ _props.album.d_count}
										</Badge>
										<TagLabel> downloads </TagLabel>
									</Tag>
								</>
							);
						} 
					})()}

					<Tag colorScheme={_props.album.protected
						? 'green' : 'red'} borderRadius="full" whiteSpace='nowrap'>
						{ _props.album.protected ? 'private' : 'public' } 
					</Tag>
				</Flex>
				<AlbumView files={_props.files} album={_props.album} />
			</Flex>
		</Flex>
	);
};