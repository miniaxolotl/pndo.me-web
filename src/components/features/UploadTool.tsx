import { FiEye, FiEyeOff, FiLock, FiTrash, FiUnlock, FiUpload } from 'react-icons/fi';
import { Flex, IconButton, Input, Tooltip, useColorMode } from '@chakra-ui/react';
import React, { SyntheticEvent } from 'react';

import { UploadOptionAction } from '../../lib/store/store.enum';
import { useUploadOption } from '../../lib/store/store';

import style from './UploadTool.module.css';

interface Props {
	auth: AuthState;
	upload_option: UploadOptionState;
}

export const UploadTool: React.FunctionComponent<Props> = (_props) => {
	const { colorMode } = useColorMode();
	const upload_option_d = useUploadOption((_state) => _state.dispatch);

	const toggleProtected = async (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		upload_option_d({
			type: UploadOptionAction.TOGGLE_PROTECTED
		});
	};
	
	const toggleHidden = async (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		upload_option_d({
			type: UploadOptionAction.TOGGLE_HIDDEN
		});
	};

	const clear = async (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	return (
		<Flex direction="row" borderRadius='md' margin='0rem 1rem' justifyContent='center' width='100%'>
			<form name="select_file_form">
				<Input name="file" type="file" hidden/>
			</form>
			<Tooltip label="upload file">
				<IconButton style={{ filter: 'drop-shadow(0.25rem 0.25rem 0.5rem #16161D)' }}
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
						onClick={toggleProtected}
						borderRightRadius='none'
						aria-label="upload file"
						_focus={{
							boxShadow: 'none'
						}}
						icon={_props.upload_option.protected ? <FiLock /> : <FiUnlock />}
					/>
				</Tooltip>

				<Tooltip label="hide file" >
					<IconButton
						colorScheme={
							_props.upload_option.hidden ? null : 'red'
						}
						onClick={toggleHidden}
						borderRadius='none'
						aria-label="upload file"
						_focus={{
							boxShadow: 'none'
						}}
						icon={_props.upload_option.hidden ? <FiEyeOff /> : <FiEye />}
					/>
				</Tooltip>

				<Tooltip label="clear recent uploads" 
					_selected={{}}>
					<IconButton
						onClick={clear}
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
