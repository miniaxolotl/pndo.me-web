import { List, FlexProps, Box, Text, Grid, Flex } from '@chakra-ui/react'
import { FileListItem } from './FileListItem'

interface props {
	placeholder?: string;
	files?: FileData[] | null;
}

export const FileList: React.FunctionComponent<props> = (props) => {

	let files: JSX.Element[] | null = null;
	if(props.files) {
		files = props.files.map(e => {
			return (
				<FileListItem key={e.file_id} filedata={e} /> 
			)
		})
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
	files: null
}