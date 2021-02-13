import { Badge, Button, Fade, Flex, Heading, Input, Spinner, Tag, TagLabel } from "@chakra-ui/react"
import filesize from "file-size"
import { useState } from "react";
import { downloadFile } from "../../lib/getfile";
import { ImagePreview } from "./ImagePreview";

interface Props {
	file: FileData;
	uri: string | null;
	hostname: string;
	bearer: string | null;
};

export const FileDisplay: React.FunctionComponent<Props> = (props) => {

	const [opacitySha, useOpacitySha] = useState(1);
	const [opacityLink, useOpacityLink] = useState(1);

	const date = new Date(props.file.create_date);
	const year = date.getUTCFullYear();
	const month
		= (date.getUTCMonth() + 1) < 10 
		? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1);
	const day
		= (date.getUTCDate() + 1) < 10 
		? "0" + (date.getUTCDate() + 1) : (date.getUTCDate() + 1);
	const create_date = `${year}-${month}-${day}`

	const copyFuncSha = (e: any) => {
		e.target.select();
		document.execCommand("copy");

		useOpacitySha(0);
		
		setTimeout(() => {
			useOpacitySha(1);
		}, 500);
	};

	const copyFuncLink = (e: any) => {
		e.target.select();
		document.execCommand("copy");

		useOpacityLink(0);
		
		setTimeout(() => {
			useOpacityLink(1);
		}, 500);
	};

	const dlFile = async () => {
		const anchor = await downloadFile(props.file, props.bearer);
		anchor?.click();
	};

	const media = props.file.type.includes("image");
	// const video = props.file.type.includes("video") && !props.file.protected;

	const direct_link
		= `https://files.${props.hostname}/f/${props.file.file_id}` 

	return (
		<Flex justifyContent="center" alignItems="center" direction="column"
			pb="2.5vh" pt="1vh">

			<Heading fontSize="2xl" color="grey" mb="2rem" textAlign="center"
				width="80%">
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

			<Flex marginY="0.25rem" mt="2rem" gridGap={2} wrap="wrap"
				justifyContent="center">
					
				<Tag colorScheme="cyan" borderRadius="full" >
					{ props.file.type }
				</Tag>
				<Tag  colorScheme="cyan" borderRadius="full">
					{ filesize(props.file.bytes).human("si") }
				</Tag>
				<Tag colorScheme="cyan" borderRadius="full">
					{ create_date }
				</Tag>
				<Tag borderRadius="full">
					<Badge colorScheme="cyan" borderRadius="full"> { props.file.downloads } </Badge>
					<TagLabel> downloads </TagLabel>
				</Tag>
				<Tag borderRadius="full">
					<Badge colorScheme="cyan" borderRadius="full"> { props.file.views } </Badge>
					<TagLabel> views </TagLabel>
				</Tag>
				<Tag colorScheme={props.file.protected
					? "green" : "red"} borderRadius="full">
					{ props.file.protected ? "private" : "public" } 
				</Tag>
			</Flex>
			<Flex marginY="0.25rem">
				<Tag borderRadius="full" paddingLeft="0" >
					<Fade animate={{ opacity: opacitySha }}
						transition={{ duration: 0.5, ease: "easeIn" }} >

						<Input borderRadius="full" type="text" size="xs"
							value={props.file.sha256} variant="filled"
							onClick={copyFuncSha} readOnly />
					</Fade>
					sha256
				</Tag>
			</Flex>
			<Flex marginY="0.25rem">
				<Tag borderRadius="full" paddingLeft="0" >
					<Fade animate={{ opacity: opacityLink }}
						transition={{ duration: 0.5, ease: "easeIn" }} >

						<Input borderRadius="full" type="text" size="xs"
							value={direct_link} variant="filled"
							onClick={copyFuncLink} readOnly />
					</Fade>
					direct link
				</Tag>
			</Flex>

			<Button marginY="1rem" onClick={dlFile}>
				Download
			</Button>
		</Flex>
	)
}