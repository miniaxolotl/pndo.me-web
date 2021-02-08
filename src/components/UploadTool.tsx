import { Flex, Tooltip, IconButton, Spacer, Box, Input } from '@chakra-ui/react'
import { ChangeEvent } from 'react';
import { SyntheticEvent } from 'react';
import { FiLock, FiUpload, FiUnlock, FiSearch, FiTrash } from 'react-icons/fi'
import { UploadHistoryAction, UploadOptionAction } from '../../enums';
import { sendFile } from '../lib/sendfile';

import { uploadHistoryStore } from '../store/uploadhistory.store';
import { uploadOptionStore } from '../store/uploadoption.store';

interface Props {
	authentication: AuthenticationState;
	uploadOption: UploadOptionState;
};

export const UploadTool: React.FunctionComponent<Props> = (props) => {
	
	const optionsDispatch = uploadOptionStore(state => state.dispatch);
	const historyDispatch = uploadHistoryStore(state => state.dispatch);

	const addFile = () => {
		const input: HTMLInputElement = window.document
			.getElementsByName("file")[0] as HTMLInputElement;
		input.click();
	};

	const progressFunc = ({progress, file, initiated}: any) => {
			
		const percent_completed = (progress.loaded / progress.total) * 100;
		
		historyDispatch({
			...{
				file : {
					filename: file.name,
					inProgress: true,
					progress: percent_completed,
					file_id: initiated,
					initiated: initiated,
				}
			},
			type: UploadHistoryAction.PROGRESS
		});
	};

	const sendAddedFile = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if(window.document.getElementsByName("file")[0]) {

			const input: HTMLInputElement = window.document
				.getElementsByName("file")[0] as HTMLInputElement;
			
			const res = { 
			file: await sendFile(
					input.files![0], props.authentication?.key!,
					props.uploadOption!, progressFunc
				)
			};	
			
			historyDispatch({
				...res,
				type: UploadHistoryAction.ADD
			});
		}
	}
	
	const toggleProtected
		= async (event: SyntheticEvent<HTMLButtonElement>) => {
			
		event.preventDefault();
		event.stopPropagation();

		optionsDispatch({
			type: UploadOptionAction.TOGGLE_PROTECTED
		});
	};
	
	const clear
		= async (event: SyntheticEvent<HTMLButtonElement>) => {
			
		event.preventDefault();
		event.stopPropagation();

		historyDispatch({
			type: UploadHistoryAction.CLEAR
		});
	};
	
	return (
		<Flex direction="row" >
			{/* <Heading fontSize="sm">{props.title}</Heading> */}
			<form name="fileForm">
				<Input name="file" type="file" onChange={sendAddedFile} hidden/>
			</form>

			<Tooltip label="Search files (soon)">
				<Box>
					<IconButton disabled
						borderRadius="100%"
						aria-label="Toggle protect file"
						_focus={{
							boxShadow: "none",
						}}
						icon={ <FiSearch height={8} /> }
						/>
				</Box>
			</Tooltip>

			<Spacer width="4rem" />

			<Tooltip label="Upload file" >
				<IconButton
					onClick={addFile}
					borderRadius="100%"
					colorScheme="green"
					aria-label="Upload file"
					_focus={{
						boxShadow: "none",
					}}
					icon={<FiUpload height={8} />}
				/>
			</Tooltip>

			<Spacer />

			<Tooltip 
				label={props.authentication.loggedIn
				? "Toggle protect file" : "Must be logged in"}>
				<Box>
					<IconButton
						disabled={!props.authentication.loggedIn}
						onClick={toggleProtected}
						borderRadius="100%"
						colorScheme={
							props.uploadOption.protected ? "gray" : "red"
						}
						aria-label="Toggle protect file"
						_focus={{
							boxShadow: "none",
						}}
						icon={
							props.uploadOption.protected
							? <FiLock height={8} /> : <FiUnlock height={8} />
						}
						/>
				</Box>
			</Tooltip>

			<Spacer />

			<Tooltip 
				label="Clear files">
				<Box>
					<IconButton
						onClick={clear}
						borderRadius="100%"
						aria-label="Clear files"
						_focus={{
							boxShadow: "none",
						}}
						icon={<FiTrash height={8} />}
						/>
				</Box>
			</Tooltip>

			<Spacer />

			{/* <Tooltip label="Toggle hide file">
				<IconButton
					onClick={toggleHidden}
					borderRadius="100%"
					colorScheme={
						props.uploadOption?.hidden ? "gray" :"red"
					}
					aria-label="Toggle hide file"
					_focus={{
						boxShadow: "none",
					}}
					icon={
						props.uploadOption?.hidden
						? <FiEyeOff height={8} /> :
						<FiEye height={8} />
					}
				/>
			</Tooltip> */}
		</Flex>
	)
};
