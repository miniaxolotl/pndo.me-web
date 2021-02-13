import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { Container } from '../../components/Container'
import { Layout } from '../../components/Layout'

import { authStore } from '../../store/auth';
import { historyStore } from '../../store/history';
import { optionStore } from '../../store/option';

import { Heading } from "@chakra-ui/react"

import nookies from 'nookies';
import { State } from 'zustand'
import { getFile, prefetchFile, previewFile } from '../../lib/getfile'
import { FileDisplay } from '../../components/file/FileDisplay'
import { Hero } from '../../components/Hero'
import { HistoryAction } from '../../types';

interface Props {
	auth: AuthState & State;
	options: OptionState & State;
	history: HistoryState & State;
	hostname: string;
	file_id: string;
	authorized: boolean;
	file: FileData;
};

const Index: NextPage<Props> = (props) => {
	const [first, useFirst] = useState(false);
	const dispatchHistory = historyStore(state => state.dispatch);

	if(!first) {
		authStore.setState(props.auth);
		optionStore.setState(props.options);
		historyStore.setState(props.history);
		dispatchHistory({
			type: HistoryAction.CLEAN
		});
		!first ? useFirst(true) : void(null);
	}
	
	const state = {
		auth: {
			...authStore((state: AuthState) => (state)),
		},
		options: {
			...optionStore((state: OptionState) => (state)),
		},
		history: {
			...historyStore((state: HistoryState) => (state)),
		},
	};

	const [file, useFile] = useState<FileData | null>(props.file);
	const [uri, useURI] = useState<string | null>(null);

	const bearer
		= props.auth ? props.auth.key : null;

	if(file) {
		const media = props.file.type.includes("image");
		const video = props.file.type.includes("video") && !props.file.protected;

		useEffect(() => {
			if(first) {
				(async () => {
					useFile(await getFile(props.file_id, bearer));
					if(media) {
						useURI((await previewFile(props.file, bearer,
							media || video)).uri);
					} else if (video) {
						useURI((await previewFile(props.file, bearer,
							!(media || video))).url);
					}
				})()
			}
		}, [props.auth]);
	}


	return(
		<Layout auth={state.auth} >
			<Container direction="column" width="90vw" minHeight="30vh"
				justifyContent="flex-end" >

				<Hero title="p(a)ndo.me" hostname={props.hostname} />
			</Container>

			{
				(() => {
					if(file) {
						return(
							<FileDisplay file={file} bearer={bearer} hostname={props.hostname}
							uri={uri} />
						);
					} else {
						return(
							<Heading fontSize="2xl" color="grey">
								<Container>
									<Heading> this file does not exist or you do not have access to it! </Heading>
								</Container>
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
	const props: any= {};

	const req = ctx.req;
	if(req) {
		const hostname = req.headers.host?.split(':')[0];
		props.hostname = hostname;
	} else {
		props.hostname = "";
	}
	
	const auth = cookies['authentication'];
	const history = cookies['upload-history'];
	const options = cookies['upload-option'];

	props.auth = auth ? JSON.parse(auth) : undefined;
	props.history = history ? JSON.parse(history) : undefined;
	props.options = options ? JSON.parse(options) : undefined;
	props.file_id = ctx.query.id

	const key = props.auth ? props.auth.key : null;

	props.file = await prefetchFile(props.file_id, key);

	return props;
};

export default Index
