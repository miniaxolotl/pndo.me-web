import { NextPage } from 'next';
import { Flex, Input, Text, useColorMode } from '@chakra-ui/react';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { FileListItem } from './FileListItem';
import { UploadHistoryAction } from '../../lib/store/store.enum';
import { fileSend } from '../../lib/net/file.send';
import { useAuth, useUploadHistory, useUploadOption } from '../../lib/store/store';

import style from './FileList.module.css';

interface Props {
	placeholder?: string;
	file_list: FileShort[];
}

export const FileList: NextPage<Props> = (_props: Props) => {
	const [ open, useOpen ] = useState(false);
	const { colorMode } = useColorMode();
	const select_file_form_input = useRef<HTMLInputElement>();
	const upload_history_d = useUploadHistory((_state) => _state.dispatch);
	const upload_option = useUploadOption((_state) => _state);
	const auth = useAuth((_state) => _state);
	
	const file_list: JSX.Element[] = [];
	if(_props.file_list && (_props.file_list.length > 0)) {
		_props.file_list.forEach((_element: FileState, _i) => {
			file_list.push(
				<FileListItem file={_element} key={_element.temp_id} ></FileListItem>
			);
		});
	}
	
	useEffect(() =>{
		upload_history_d({
			type: UploadHistoryAction.CHECK
		});
	}, [ null ]);


	const _uploadProgress = ({ _progress, _files, _temp_id, _initiated }: any) => {
		const _percent_completed = (_progress.loaded / _progress.total) * 100;
		
		const new_upload: FileState = {
			initiated: _initiated,
			temp_id: _temp_id,
			progress: _percent_completed,
			complete: false,
			error: false
		};
		
		if(_files.length > 1) {
			const _list = [];
			for(let i = 0; i< _files.length; i++) {
				_list.push(_files[0].name);
			}

			new_upload.album_id = _temp_id;
			new_upload.filename = _list.join(' - ');
		} else {
			new_upload.file_id = _temp_id;
			new_upload.filename = (_files[0] as File).name;
		}

		upload_history_d({
			type: UploadHistoryAction.PROGRESS,
			new_upload
		});
	};

	const _sendFileForm = async (_event) => {
		_event.preventDefault();
		_event.stopPropagation();
		select_file_form_input.current.click();
		const responce = await fileSend(select_file_form_input.current.files,
			auth.authorization,
			upload_option,
			_uploadProgress
		);
		if(responce.files.length > 1) {
			const _list = [];
			for(let i = 0; i< responce.files.length; i++) {
				_list.push(responce.files[i].filename);
			}
			responce.album_id = responce.album.album_id;
			responce.filename = _list.join(' - ');
			responce.protected = (responce.album as FileLong).protected;
			responce.hidden = (responce.album as FileLong).hidden;
		} else {
			responce.file_id = (responce.files[0] as FileLong).file_id;
			responce.filename = (responce.files[0] as FileLong).filename;
			responce.type = (responce.files[0] as FileLong).type;
			responce.bytes = (responce.files[0] as FileLong).bytes;
			responce.type = (responce.files[0] as FileLong).type;
			responce.protected = (responce.album as FileLong).protected;
			responce.hidden = (responce.album as FileLong).hidden;
		}
		upload_history_d({
			type: UploadHistoryAction.COMPLETE,
			new_upload: responce
		});
	};

	const _dragIn = (event) => {
		event.preventDefault();
		event.stopPropagation();
		useOpen(true);
	};

	const _dragOut = (event) => {
		event.preventDefault();
		event.stopPropagation();
		useOpen(false);
	};

	const _drop = (event: SyntheticEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		select_file_form_input.current.files = (event as any).dataTransfer.files;
		_sendFileForm(event);
		useOpen(false);
	};
	
	return(
		<Flex borderRadius='md' direction='column' justifyItems='center' textAlign='center' shadow='dark-lg'
			onDragEnter={_dragIn} onDrop={_drop} onDragEnd={_drop} onDragOver={_dragIn}
			className={colorMode === 'dark' ? style.container : style.containerLight}>
			{ file_list.length ? file_list : <Text _hover={{ cursor: 'default' }}> {_props.placeholder} </Text> }
			<form name="select_file_form">
				<Input name="file" type="file" ref={select_file_form_input}
					onInput={_sendFileForm}
					multiple hidden/>
			</form>
			{(() => {
				if(open) {
					return (
						<Flex position='absolute' onDragEnter={_dragIn} onDragExit={_dragOut} onDragEnd={_drop}
							display={open ? 'block' : 'none'} zIndex='400'
							top='0' left='0' backgroundColor='black' opacity='50%' width='100%' height='100%' />
					);
				}
			})()}
			<Flex position='fixed' />
		</Flex>
	);
};

FileList.defaultProps = {
	placeholder: 'Drag and drop to start uploading... '
};