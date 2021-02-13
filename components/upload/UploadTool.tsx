import { Flex, Tooltip, IconButton, Spacer, Box, Input } from '@chakra-ui/react'
import { ChangeEvent } from 'react';
import { SyntheticEvent } from 'react';
import { FiLock, FiUpload, FiUnlock, FiSearch, FiTrash } from 'react-icons/fi'

import { optionStore } from '../../store/option';
import { historyStore } from '../../store/history';
import { HistoryAction, OptionAction } from '../../types';
import { sendFile } from '../../lib/sendfile';

interface Props {
	auth: AuthState;
	options: OptionState;
};

export const UploadTool: React.FunctionComponent<Props> = (props) => {
	
	const dispatchOptions = optionStore(state => state.dispatch);
	const dispatchHistory = historyStore(state => state.dispatch);

	const addFile = () => {
		const input: HTMLInputElement = window.document
			.getElementsByName("file")[0] as HTMLInputElement;
		input.click();
	};

	const progressFunc = ({progress, file, initiated}: any) => {
			
		const percent_completed = (progress.loaded / progress.total) * 100;
		
		dispatchHistory({
			...{
				file : {
					filename: file.name,
					inProgress: true,
					progress: percent_completed,
					file_id: initiated,
					initiated: initiated,
				}
			},
			type: HistoryAction.PROGRESS
		});
	};

	const sendAddedFile = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if(window.document.getElementsByName("file")[0]) {

			const input: HTMLInputElement
				= event.target.form!.file as HTMLInputElement;
			
			const res = await sendFile(input.files![0], props.auth?.key!,
				props.options!, progressFunc);

			const file = {
				file_id: res.file_id,
				filename: res.filename,
				type: res.type,
				bytes: res.bytes,
				protected: res.protected,
				hidden: res.hidden,
				inProgress: res.inProgress,
				initiated: res.initiated,
				progress: res.progress,
			};

			dispatchHistory({
				...{ file },
				type: HistoryAction.ADD
			});
		}
	}
	
	const toggleProtected
		= async (event: SyntheticEvent<HTMLButtonElement>) => {
			
		event.preventDefault();
		event.stopPropagation();

		dispatchOptions({
			type: OptionAction.TOGGLE_PROTECTED
		});
	};
	
	const clear
		= async (event: SyntheticEvent<HTMLButtonElement>) => {
			
		event.preventDefault();
		event.stopPropagation();

		dispatchHistory({
			type: HistoryAction.CLEAR
		});
	};
	
	return (
		<Flex direction="row" >
			<form name="fileForm">
				<Input name="file" type="file" onChange={sendAddedFile} hidden/>
			</form>

			<Tooltip label="Search files">
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
				<IconButton form="fileForm"
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
				label={props.auth.loggedIn
				? "Toggle file protecton" : "Must be logged in"}>
				<Box>
					<IconButton
						disabled={!props.auth.loggedIn}
						onClick={toggleProtected}
						borderRadius="100%"
						colorScheme={
							props.options.protected ? "gray" : "red"
						}
						aria-label="Toggle file protecton"
						_focus={{
							boxShadow: "none",
						}}
						icon={
							props.options.protected
							? <FiLock height={8} /> : <FiUnlock height={8} />
						}
						/>
				</Box>
			</Tooltip>

			<Spacer />

			<Tooltip 
				label="Clear file list">
				<Box>
					<IconButton
						onClick={clear}
						borderRadius="100%"
						aria-label="Clear file list"
						_focus={{
							boxShadow: "none",
						}}
						icon={<FiTrash height={8} />}
						/>
				</Box>
			</Tooltip>
		</Flex>
	)
};
