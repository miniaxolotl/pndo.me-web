import { Flex } from "@chakra-ui/react"

interface Props {
	type: string;
	uri: string;
	file: FileData;
	bearer: string | null;
};

export const VideoPreview: React.FunctionComponent<Props> = (props) => {

	return (
		<Flex height="30vh" justifyContent="center">
			<video  controls>
				<source src={props.uri} />
			</video>
		</Flex>
	)
}