import { Flex, IconButton, GridItem, Text, Icon, Tag, Progress,
	Link, Input, Fade } from '@chakra-ui/react'
import { FiFile, FiX } from 'react-icons/fi'
import filesize from 'file-size';
import { SyntheticEvent } from 'react';
import { uploadHistoryStore } from '../store/uploadhistory.store';
import { UploadHistoryAction } from '../../enums';
import { useState } from 'react';


interface props {
	filedata: FileData;
	hostname: string;
};

export const FileListItem: React.FunctionComponent<props> = (props) => {
	
	const [opacity, useOpacity] = useState(1);
	const uploadHistoryDispatch = uploadHistoryStore(state => state.dispatch);

	const deleteFunc
		= (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			event.stopPropagation();

			uploadHistoryDispatch({
				...{ file_id: (event.target as Element).id },
				type: UploadHistoryAction.DELETE
			});
	};

	const copyFunc = (e: any) => {
		e.target.select();
		document.execCommand("copy");

		const tmp = e.target.value;
		useOpacity(0);
		
		setTimeout(() => {
			useOpacity(1);
			e.target.value = tmp;
		}, 500);
	};

	return (
		<GridItem border="1px" rounded="md" padding="0.5rem"
			id={props.filedata.file_id}>

			<IconButton aria-label="Delete entry" float="right" variant="ghost"
				onClick={deleteFunc} icon={<FiX id={props.filedata.file_id} />}
				id={props.filedata.file_id} />
				
			<Flex direction="column">
				<Flex>
					<Link href={
						`http://${props.hostname}/file/${props.filedata.file_id}`}>
						<Text key="filename" textOverflow="ellipsis"
							whiteSpace="nowrap" overflow="hidden" >
							<Icon as={FiFile} />
							{ props.filedata.filename }
						</Text>
					</Link>
				</Flex>

				<Flex gridGap={2} wrap="wrap" width="100%" overflow="hidden">

					{
						(() => {
							if(props.filedata.inProgress) {
								return (
									<Progress value={props.filedata.progress}
									width="100%" size="xs" borderRadius="md"/>
								);

							} else {
								return (
				<>
					<Fade animate={{ opacity }}
						transition={{ duration: 0.5, ease: "easeIn" }} >

						<Input borderRadius="full" type="text" size="xs" 
							readOnly onClick={copyFunc} variant="filled"
							value={
								props.hostname+"/file/"+props.filedata.file_id
							} />
					</Fade>
					<Tag> { props.filedata.type } </Tag>
					<Tag> { filesize(props.filedata.bytes).human("si") } </Tag>
					<Tag colorScheme={props.filedata.protected
						? "green" : "red"}>
						{ props.filedata.protected ? "private" : "public" } 
					</Tag>
						
					{/* <Tag colorScheme={props.filedata.hidden ? "green" : "red"}>
						{ props.filedata.hidden ? "unlisted" : "listed" } 
					</Tag> */}
				</>
								);

							}
						})()
					}
					{ props.filedata.expire_date ?
						<Tag> props.filedata.expire_date </Tag> : null  }
				</Flex>
			</Flex>
		</GridItem>
	)
}