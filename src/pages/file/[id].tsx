import { NextPage } from 'next'

import { Container } from '../../components/Container'
import { Layout } from '../../components/Layout'

import { authenticationStore } from '../../store/authentication.store'
import { useEffect, useState } from 'react'
import { uploadHistoryStore } from '../../store/uploadhistory.store'
import { uploadOptionStore } from '../../store/uploadoption.store'

import { Heading } from "@chakra-ui/react"

import nookies from 'nookies';
import { State } from 'zustand'
import { getFile, prefetchFile } from '../../lib/getfile'
import { FileDisplay } from '../../components/FileDisplay'
import { Hero } from '../../components/Hero'

interface Props {
	authentication: AuthenticationState & State;
	uploadOption: UploadOptionState & State;
	uploadHistory: UploadHistoryState & State;
	hostname: string;
	file_id: string;
	authorized: boolean;
	file: FileData;
};

const Index: NextPage<Props> = (props) => {

	const [first, useFirst] = useState(true);
	const [file, useFile] = useState<FileData | null>(props.file);

	if(first) {
		useFirst(false);
		authenticationStore.setState(props.authentication);
		uploadHistoryStore.setState(props.uploadHistory);
		uploadOptionStore.setState(props.uploadOption);
	}
	
	const state = {
		authentication: {
			...authenticationStore((state: AuthenticationState) => (state)),
		},
		uploadHistory: {
			...uploadHistoryStore((state: UploadHistoryState) => (state)),
		},
		uploadOption: {
			...uploadOptionStore((state: UploadOptionState) => (state)),
		}
	};

	const bearer
		= props.authentication ? props.authentication.key : null;

	useEffect(() => {
		if(first) {
			(async () => {
				useFile(await getFile(props.file_id, bearer));
			})()
		}
	}, [props.authentication]);
		
	return(
		<Layout authentication={state.authentication} >
			<Container direction="column" width="90vw" minHeight="40vh"
				justifyContent="flex-end" alignItems="center">
			</Container>
			<Hero title="pandome" hostname={props.hostname} />
			{
				(() => {
					if(file) {
						return(<FileDisplay file={file} bearer={bearer} />);
					} else {
						return(
							<Heading fontSize="2xl" color="grey">
								{props.file.filename}
							</Heading>
						);
					}
				})()
			}
		</Layout>
	)
};

Index.getInitialProps = async (ctx) => {

	const cookies = nookies.get(ctx);
	const props: any = {};
	
	const authentication = cookies['authentication']
	const uploadHistory = cookies['upload-history']
	const uploadOption = cookies['upload-option']

	props.hostname = ctx.req && ctx.req.headers.host
		? ctx.req.headers.host : "";
	
	if(authentication)
		props.authentication = JSON.parse(authentication);
	if(uploadHistory)
		props.uploadHistory = JSON.parse(uploadHistory);
	if(uploadOption)
		props.uploadOption = JSON.parse(uploadOption);

	const key = props.authentication ? props.authentication.key : null;

	props.file_id = ctx.query.id
	props.file = await prefetchFile(props.file_id, key);

	return props;
};

export default Index
