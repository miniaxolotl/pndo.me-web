import { FiLock, FiTrash, FiUnlock, FiUpload } from 'react-icons/fi';
import { Flex, IconButton, Input, Tooltip, useColorMode } from '@chakra-ui/react';
import React, { SyntheticEvent, useRef } from 'react';

import { fileSend } from '../../lib/net/file.send';
import { UploadHistoryAction, UploadOptionAction } from '../../lib/store/store.enum';
import { useUploadHistory, useUploadOption } from '../../lib/store/store';

import style from './UploadTool.module.css';

interface Props {
	auth: AuthState;
	upload_option: UploadOptionState;
}

export const UploadTool: React.FunctionComponent<Props> = (_props) => {
	const { colorMode } = useColorMode();
	const upload_option_d = useUploadOption((_state) => _state.dispatch);
	const upload_history_d = useUploadHistory((_state) => _state.dispatch);
	const select_file_form_input = useRef<HTMLInputElement>();

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

	const _openFileDialog = () => {
		select_file_form_input.current.click();
	};

	const _sendFileForm = async (_event) => {
		_event.preventDefault();
		_event.stopPropagation();
		select_file_form_input.current.click();
		const responce = await fileSend(select_file_form_input.current.files,
			_props.auth.authorization,
			_props.upload_option,
			_uploadProgress
		);
		if(responce.files.length > 1) {
			const _list = [];
			for(let i = 0; i< responce.files.length; i++) {
				_list.push(responce.files[0].filename);
			}
			responce.album_id = responce.album.album_id;
			responce.filename = _list.join(' - ');
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

	const _toggleProtected = async (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		upload_option_d({
			type: UploadOptionAction.TOGGLE_PROTECTED
		});
	};
	

	const _clear = async (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		upload_history_d({
			type: UploadHistoryAction.CLEAR
		});
	};

	return (
		<Flex direction="row" borderRadius='md' margin='0rem 1rem' justifyContent='center' width='100%'>
			<form name="select_file_form">
				<Input name="file" type="file" ref={select_file_form_input}
					onInput={_sendFileForm}
					multiple hidden/>
			</form>
			<Tooltip label="upload file">
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
			<Flex direction="row" borderRadius='md' style={{ filter: 'drop-shadow(0.25rem 0.25rem 0.5rem #16161D)' }}
				className={colorMode === 'dark' ? style.background : style.backgroundLight }>

				<Tooltip label="protect file" >
					<IconButton isDisabled={!_props.auth.loggedIn}
						colorScheme={
							_props.upload_option.protected && _props.auth.loggedIn ? null : 'red'
						}
						onClick={_toggleProtected}
						borderRightRadius='none'
						aria-label="upload file"
						_focus={{
							boxShadow: 'none'
						}}
						icon={_props.upload_option.protected ? <FiLock /> : <FiUnlock />}
					/>
				</Tooltip>

				{/* <Tooltip label="hide file" >
					<IconButton
						colorScheme={
							_props.upload_option.hidden ? null : 'red'
						}
						onClick={_toggleHidden}
						borderRadius='none'
						aria-label="upload file"
						_focus={{
							boxShadow: 'none'
						}}
						icon={_props.upload_option.hidden ? <FiEyeOff /> : <FiEye />}
					/>
				</Tooltip> */}

				<Tooltip label="clear recent uploads" 
					_selected={{}}>
					<IconButton
						onClick={_clear}
						borderLeftRadius='none'
						aria-label="clear recent uploads"
						_active={{}}
						_focus={{
							boxShadow: 'none'
						}}
						icon={<FiTrash />}
					/>
				</Tooltip>
			</Flex>

		</Flex>
	);
};
