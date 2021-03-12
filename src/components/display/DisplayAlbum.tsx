import { NextPage } from 'next';
import filesize from 'file-size';
import { FiDownload, FiUpload } from 'react-icons/fi';
import React, { useEffect, useRef, useState } from 'react';

import { Badge, Button, Flex, Icon, IconButton, Input, Tag, TagLabel, Tooltip } from '@chakra-ui/react';

import { AlbumView } from './AlbumView';
import { addToAlbum } from '../../lib/net/file.send';
import { downloadAlbum } from '../../lib/net/file.download';


interface Props {
	auth: AuthState;
	album: Album;
	files: FileShort[];
}

export const DisplayAlbum: NextPage<Props> = (_props: Props) => {
	const select_file_form_input = useRef<HTMLInputElement>();
	const date = new Date(_props.album.create_date);
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth();
	const day = date.getUTCDay() < 10 ? '0' + date.getUTCDay() : date.getUTCDay();
	const create_date = `${year}-${month}-${day}`;
	const [ isDownloading, useIsDownloading ] = useState(false);
	const [ files, useFiles ] = useState([]);

	useEffect(() => {
		useFiles(_props.files);
	}, []);

	const _downloadAlbum = async () => {
		useIsDownloading(true);
		const _anchor = await downloadAlbum(_props.album);
		if(_anchor) {
			(_anchor as HTMLAnchorElement).click();
		}
		useIsDownloading(false);
	};

	const _uploadProgress = ({ _progress, _file, _temp_id, _initiated }: any) => {
		const _percent_completed = (_progress.loaded / _progress.total) * 100;
		
		let _filter = files.filter(item => {
			return (_temp_id != item._temp_id);
		});

		const update_package = {
			filename: _file.name,
			create_date: _initiated,
			temp_id: _temp_id,
			bytes: 'uploading...',
			progress: _percent_completed,
			complete: true,
			error: false
		};
		
		_filter = [ update_package, ...files ];
		
		_filter = [ ..._filter.sort((a, b) => {
			return (new Date(a.create_date).getTime() - new Date(b.create_date).getTime());
		}) ];
		
		useFiles(_filter);
	};

	const _openFileDialog = () => {
		select_file_form_input.current.click();
	};

	const _addToAlbum = async (_event) => {
		_event.preventDefault();
		_event.stopPropagation();
		select_file_form_input.current.click();
		
		const n_files = select_file_form_input.current.files.length;
		const _files = select_file_form_input.current.files;
		for(let i = 0; i < n_files; i++) {
			const file = _files[i];
			
			const responce = await addToAlbum(file,
				_props.album.album_id,
				_props.auth.authorization,
				{ protected: _props.album.protected, hidden: _props.album.hidden } as UploadOptionState,
				_uploadProgress
			);
			useFiles([ ...responce.files, ...files ]);
		}
	};

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
				<Flex marginY="1rem" justify='center'>
					<form name="select_file_form">
						<Input name="file" type="file" ref={select_file_form_input}
							onInput={_addToAlbum}
							multiple hidden/>
					</form>
					<Tooltip label="add to album">
						<IconButton style={{ filter: 'drop-shadow(0.25rem 0.25rem 0.5rem #16161D)' }}
							onClick={_openFileDialog}
							colorScheme="green"
							aria-label="upload file"
							_focus={{
								boxShadow: 'none'
							}}
							icon={<FiUpload />}
						/>
					</Tooltip>
					<Tooltip label="download album">
						<Button onClick={_downloadAlbum}
							isLoading={isDownloading}
							disabled={isDownloading}
							marginX='2rem'
							loadingText="downloading...">
							<Icon as={FiDownload} marginRight='4px' />
						Download
						</Button>
					</Tooltip>
				</Flex>
				<AlbumView update_hook={{ files, useFiles }} files={files} album={_props.album} />
			</Flex>
		</Flex>
	);
};