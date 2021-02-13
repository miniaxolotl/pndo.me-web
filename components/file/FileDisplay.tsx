import { Badge, Button, Fade, Flex, Heading, Input, Spacer, Spinner, Tag, TagLabel } from "@chakra-ui/react"
import filesize from "file-size"
import { useState } from "react";
import { downloadFile } from "../../lib/getfile";
import { ImagePreview } from "./ImagePreview";

interface Props {
	file: FileData;
	uri: string | null;
	bearer: string | null;
};

export const FileDisplay: React.FunctionComponent<Props> = (props) => {

	const [opacity, useOpacity] = useState(1);

	const date = new Date(props.file.create_date);
	const year = date.getUTCFullYear();
	const month
		= date.getUTCMonth() < 10 
		? "0" + date.getUTCMonth() : date.getUTCMonth();
	const day
		= date.getUTCDay() < 10 
		? "0" + date.getUTCDay() : date.getUTCDay();
	const create_date = `${year}-${month}-${day}`

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

	const dlFile = async () => {
		const anchor = await downloadFile(props.file, props.bearer);
		anchor?.click();
	};

	const media = props.file.type.includes("image");
	// const video = props.file.type.includes("video") && !props.file.protected;

	return (
		<Flex justifyContent="center" alignItems="center" direction="column"
			pb="2.5vh" pt="1vh">

			<Heading fontSize="2xl" color="grey" mb="2rem">
				{props.file.filename}
			</Heading>
			
			{
				(() => {
					if(props.file.type.includes("image") && props.uri) {
						return (
							<ImagePreview uri={props.uri!} />
						);
					} 
					// else if(props.file.type.includes("video") && props.uri) {
					// 	return (
					// 		<VideoPreview uri={props.uri!} file={props.file}
					// 			type={props.file.type} bearer={props.bearer} />
					// 	);
					// } 
					else if (media) {
						return (
							<Spinner size="xl" />
						);
					}
				})()
			}

			<Flex marginY="0.25rem" mt="2rem" wrap="wrap">
				<Tag colorScheme="cyan" borderRadius="full" >
					{ props.file.type }
				</Tag>
				<Spacer width="1rem" />
				<Tag  colorScheme="cyan" borderRadius="full">
					{ filesize(props.file.bytes).human("si") }
				</Tag>
				<Spacer width="1rem" />
				<Tag colorScheme="cyan" borderRadius="full">
					{ create_date }
				</Tag>
				<Spacer width="1rem" />
				<Tag borderRadius="full">
					<Badge colorScheme="cyan" borderRadius="full"> { props.file.downloads } </Badge>
					<TagLabel> downloads </TagLabel>
				</Tag>
				<Spacer width="1rem" />
				<Tag borderRadius="full">
					<Badge colorScheme="cyan" borderRadius="full"> { props.file.views } </Badge>
					<TagLabel> views </TagLabel>
				</Tag>
				<Spacer width="1rem" />
				<Tag colorScheme={props.file.protected
					? "green" : "red"} borderRadius="full">
					{ props.file.protected ? "private" : "public" } 
				</Tag>
			</Flex>
			<Flex marginY="0.25rem">
				<Tag borderRadius="full" paddingLeft="0" >
					<Fade animate={{ opacity }}
						transition={{ duration: 0.5, ease: "easeIn" }} >

						<Input borderRadius="full" type="text" size="xs"
							value={props.file.sha256} variant="filled"
							onClick={copyFunc} readOnly />
					</Fade>
					sha256
				</Tag>
			</Flex>

			<Button marginY="1rem" onClick={dlFile}>
				Download
			</Button>
		</Flex>
	)
}