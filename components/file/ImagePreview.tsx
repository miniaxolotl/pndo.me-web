import { Image } from "@chakra-ui/react"

interface Props {
	uri: string;
};

export const ImagePreview: React.FunctionComponent<Props> = (props) => {
	return (
		<Image src={props.uri} height="30vh" borderRadius="lg" />
	)
}