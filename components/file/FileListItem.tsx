import { Flex, IconButton, GridItem, Text, Icon, Tag, Progress,
	Link, Input, Fade } from '@chakra-ui/react'
import { FiFile, FiX } from 'react-icons/fi'
import filesize from 'file-size';
import { SyntheticEvent } from 'react';
import { historyStore } from '../../store/history';
import { HistoryAction } from '../../types';
import { useState } from 'react';


interface props {
	filedata: FileData;
	hostname: string;
};

export const FileListItem: React.FunctionComponent<props> = (props) => {
	
	const [opacity, useOpacity] = useState(1);
	const uploadHistoryDispatch = historyStore(state => state.dispatch);

	const deleteFunc
		= (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			event.stopPropagation();

			uploadHistoryDispatch({
				...{ file_id: (event.target as Element).id },
				type: HistoryAction.DELETE
			});
	};

	const copyFunc = (e: any) => {
		e.target.select();
		document.execCommand("copy");

		useOpacity(0);
		
		setTimeout(() => {
			useOpacity(1);
		}, 500);
	};

	const error = props.filedata.progress && (props.filedata.progress < 0)
		? true : false;

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

				<Flex gridGap={2} wrap="wrap" justifyContent="flex-start" width="100%" overflow="hidden">

					{
						(() => {
							if(props.filedata.inProgress) {
								return (
									<Progress value={props.filedata.progress}
									width="100%" size="xs" borderRadius="md"/>
								);
							} else if (error) {
								return (
									<Progress value={props.filedata.progress}
									colorScheme="red" width="100%"
									size="xs" borderRadius="md"/>
								);
							} else {
								return (
				<>
					<Fade animate={{ opacity }}
						transition={{ duration: 0.5, ease: "easeIn" }} >

						<Input borderRadius="full" type="text" size="xs" 
							readOnly onClick={copyFunc} variant="filled"
							value={
								"https://"+props.hostname+"/file/"+props.filedata.file_id
							} />
					</Fade>
					<Tag colorScheme="purple"> { props.filedata.type } </Tag>
					<Tag colorScheme="purple">
						{ filesize(props.filedata.bytes).human("si") }
					</Tag>
					<Tag colorScheme={props.filedata.protected
						? "green" : "red"}>
						{ props.filedata.protected ? "private" : "public" } 
					</Tag>

					{ props.filedata.expire_date ?
						<Tag colorScheme="purple">
							{ props.filedata.expire_date }
						</Tag> : null  }
						
					{/* <Tag colorScheme={props.filedata.hidden ? "green" : "red"}>
						{ props.filedata.hidden ? "unlisted" : "listed" } 
					</Tag> */}
				</>
								);

							}
						})()
					}
				</Flex>
			</Flex>
		</GridItem>
	)
}