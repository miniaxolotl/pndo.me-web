import { Flex, FlexProps, GridItem, Box, Text, Icon, List, Tag, ListItem } from '@chakra-ui/react'
import { FiFile, FiImage, FiUpload, FiEyeOff } from 'react-icons/fi'

interface props {
	filedata: FileData;
}

export const FileListItem: React.FunctionComponent<props> = (props) => {

	return (
		<GridItem border="1px" rounded="md" padding="0.5rem" 
			direction="row">
				
			<Flex>
				<Icon height="1rem" width="1rem" as={FiImage} />
			</Flex>
			<Flex direction="column">
				<Flex>
					<Text key="filename" textOverflow="ellipsis"
						whiteSpace="nowrap" overflow="hidden">

						{ props.filedata.filename }
					</Text>
				</Flex>
				<Flex gridGap={2} wrap="wrap" width="100%" overflow="hidden">
					<Tag> { props.filedata.type } </Tag>
					<Tag> { props.filedata.bytes + "b" } </Tag>
					<Tag colorScheme={props.filedata.protected ? "green" : "red"}>
						{ props.filedata.protected ? "private" : "public" } 
					</Tag>
					<Tag colorScheme={props.filedata.hidden ? "green" : "red"}>
						{ props.filedata.hidden ? "unlisted" : "listed" } 
					</Tag>
					{ props.filedata.expire_date ?
						<Tag> props.filedata.expire_date </Tag> : null  }
					
				</Flex>
			</Flex>
		</GridItem>
	)
}