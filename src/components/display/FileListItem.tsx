import Link from 'next/link';
import { NextPage } from 'next';
import filesize from 'file-size';
import { Box, Link as CLink, Fade, Flex, Icon, IconButton, Input, Progress,
	Tag, Text, useColorMode } from '@chakra-ui/react';
import { FiFile, FiFolder, FiX } from 'react-icons/fi';
import React, { SyntheticEvent, useState } from 'react';

import { UploadHistoryAction } from '../../lib/store/store.enum';
import { useUploadHistory } from '../../lib/store/store';

import { config } from '../../res/config';
import style from './FileListItem.module.css';

interface Props {
	file: FileState;
}

export const FileListItem: NextPage<Props> = (_props: Props) => {
	const upload_history_d = useUploadHistory((_state) => _state.dispatch);
	const [ opacity, useOpacity ] = useState(1);
	const { colorMode } = useColorMode();
	const _data = _props.file;
	const param = `${_data.file_id ? _data.file_id : _data.album_id}`;
	const full_url = `${config.server}/${_data.file_id ? 'file' : 'album'}/${param}`;

	const _deleteEntry = (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		event.stopPropagation();
		upload_history_d({
			type: UploadHistoryAction.CLEAR,
			new_upload: {
				temp_id: _data.temp_id
			}
		});
	};

	const _copyText = (e: any) => {
		e.target.select();
		document.execCommand('copy');

		const tmp = e.target.value;
		useOpacity(0);
		
		setTimeout(() => {
			useOpacity(1);
			e.target.value = tmp;
		}, 500);
	};

	return(
		<Box borderRadius='md' shadow='dark-lg' paddingY='4px'
			className={colorMode === 'dark' ? style.background : style.backgroundLight}>
			<Flex direction='column'>
				<Flex direction='row' paddingX='8px'>
					<Flex whiteSpace='nowrap' overflow='hidden' width='100%' justifyContent='space-between'>
						<Flex width='80%' alignItems='center'>
							<Icon as={_data.file_id ? FiFile : FiFolder}/>
							<CLink as={Link} href={full_url} width='100%' overflow='hidden' alignItems='center'>
								<Flex as='a' textOverflow='ellipsis' overflow='hidden'
									_hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
									<Text textOverflow='ellipsis' overflow='hidden'>
										{ _data.album_id ? 'Album: ' : 'File: ' }
										{ _data.filename }
									</Text>
								</Flex>
							</CLink>
						</Flex>
						<Flex alignSelf='flex-end'>
							<IconButton aria-label="Delete entry" variant="ghost" icon={<FiX />}
								onClick={_deleteEntry} id={_data.temp_id} />
						</Flex>
					</Flex>
				</Flex>
				{(() => {
					if(_data.complete) {
						return (
							<Flex direction='row' paddingX='8px' paddingY='4px' gridGap={1}>
								<Tag> { _data.type ? _data.type  : 'album' } </Tag>
								{
									_data.file_id ? <Tag> { filesize(_data.bytes).human('si') } </Tag> : null
								}
								<Tag colorScheme={_data.protected ? 'green' : 'red'}>
									{ _data.protected ? 'protected' : 'unprotected' } 
								</Tag>
								<Tag colorScheme={_data.hidden ? 'green' : 'red'}>
									{ _data.hidden ? 'hidden' : 'public' } 
								</Tag>
							</Flex>
						);
					}
				})()}
				<Flex direction='column' paddingX='8px' paddingBottom='4px'>
					{(() => {
						if(_data.complete) {
							return (
								<>
									<Fade animate={{ opacity }}
										transition={{ duration: 0.5, ease: 'easeIn' }} >
										<Input type='text' size='xs' variant='filled' borderRadius='md'
											_hover={{ opacity: 0.5, cursor: 'copy' }}
											onClick={_copyText} readOnly value={full_url}/>
									</Fade>
								</>
							);
						} else {
							return (
								<>
									<Progress max={100} value={_data.progress} width="100%" size="xs" borderRadius="md"/>
								</>
							);
						}
					})()}
				</Flex>
			</Flex>
		</Box>
	);
};