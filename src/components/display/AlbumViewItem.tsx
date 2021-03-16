import Link from 'next/link';
import { NextPage } from 'next';
import fetch from 'node-fetch';
import filesize from 'file-size';
import { Box, Link as CLink, Fade, Flex, Icon, IconButton, Input, Progress, Tag,
	Text, useColorMode } from '@chakra-ui/react';
import { FiFile, FiFolder, FiX } from 'react-icons/fi';
import React, { SyntheticEvent, useState } from 'react';

import { UploadHistoryAction } from '../../lib/store/store.enum';
import { useAuth, useUploadHistory } from '../../lib/store/store';

import { config } from '../../res/config';
import style from './AlbumViewitem.module.css';

interface Props {
	file: FileState;
	update_hook: any;
}

export const AlbumViewItem: NextPage<Props> = (_props: Props) => {
	const { colorMode } = useColorMode();
	const [ opacity, useOpacity ] = useState(1);
	const auth: AuthState = useAuth((_state) => _state);
	const upload_history_d = useUploadHistory((_state) => _state.dispatch);
	
	const _data = _props.file;
	const full_url = `${config.canonical}/file/${_props.file.file_id}`;

	const _deleteEntry = async (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		event.stopPropagation();
		await new Promise((resolve) => {
			fetch(`${config.canonical}/api/file/${_props.file.file_id}`, {
				method: 'delete',
				headers: {
					cookie: `session_id=${auth.authorization}`
				}
			}).then(async (res) => {
				if(res.status == 200) {
					const _filter = (_props.update_hook.files as FileState[]).filter((item) => {
						return (_props.file.file_id != item.file_id);
					});
					_props.update_hook.useFiles(_filter);
					if(_props.update_hook.files.length < 1) {
						upload_history_d({
							type: UploadHistoryAction.DELETE,
							new_upload: {
								file_id: _data.file_id,
								album_id: _data.album_id
							}
						});
					}
					resolve(null);
				} else {
					resolve(null);
				}
			});
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
		<Box borderRadius='md' shadow='dark-lg' paddingY='4px' width='100%'
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
								onClick={_deleteEntry} />
						</Flex>
					</Flex>
				</Flex>
				{(() => {
					if(!_data.error) {
						return (
							<Flex direction='row' paddingX='8px' paddingY='4px' gridGap={1}>
								<Tag _hover={{ cursor: 'default' }}>
									{ _data.type ? _data.type  : 'uploading...' }
								</Tag>
								{
									_data.file_id ?
										<Tag _hover={{ cursor: 'default' }}>
											{ filesize(_data.bytes).human('si') }
										</Tag> : null
								}
							</Flex>
						);
					}
				})()}
				<Flex direction='column' paddingX='8px' paddingBottom='4px'>
					{(() => {
						if(!_data.complete && !_data.error) {
							return (
								<>
									<Fade animate={{ opacity }}
										transition={{ duration: 0.5, ease: 'easeIn' }} >
										<Input type='text' size='xs' variant='filled' borderRadius='md'
											_hover={{ cursor: 'copy' }}
											onClick={_copyText} readOnly value={full_url}/>
									</Fade>
								</>
							);
						} else {
							return (
								<Progress max={100} value={_data.progress} width="100%" size="xs" borderRadius="md"
									colorScheme={(!_data.complete &&  !_data.error)
										? 'blue' : _data.error ? 'red' : 'green'}/>
							);
						}
					})()}
				</Flex>
			</Flex>
		</Box>
	);
};