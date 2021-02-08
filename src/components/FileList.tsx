import { List, Text } from '@chakra-ui/react'
import { FileListItem } from './FileListItem'

interface props {
	placeholder?: string;
	uploadHistory?: UploadHistoryState;
	hostname: string;
}

export const FileList: React.FunctionComponent<props> = (props) => {

	let files: JSX.Element[] | null = null;
	if(props.uploadHistory?.history && props.uploadHistory.history.length > 0) {
		files = props.uploadHistory?.history.map(e => {
			return (
				<FileListItem key={e.file_id} filedata={e}
					hostname={props.hostname}/> 
			)
		});
		files.reverse();
	}
	
	return (
		<List border="1px" borderColor="gray.200"
			borderStyle="dashed" rounded="md"
			margin="2rem" padding="1rem" spacing={4}
			width="100%">
				
			{ files ? files : <Text align="center"> {props.placeholder} </Text>}
		</List>
	)
}

FileList.defaultProps = {
	placeholder: "Drag and drop to start uploading... ",
}