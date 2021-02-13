import { NextPage } from 'next';
import { useState } from 'react';
import { NextSeoProps } from 'next-seo';

import nookies from 'nookies';
import { State } from 'zustand';

import { Hero } from '../components/Hero';
import { Container } from '../components/Container'
import { Main } from '../components/Main';
import { UploadTool } from '../components/upload/UploadTool';
import { FileList } from '../components/file/FileList';

import { authStore } from '../store/auth';
import { historyStore } from '../store/history';
import { optionStore } from '../store/option';
import { HistoryAction } from '../types';
import { DragDropLayout } from '../components/DragDropLayout';

interface Props {
	auth: AuthState & State;
	options: OptionState & State;
	history: HistoryState & State;
	hostname: string;
};

const IndexPage: NextPage<Props> = (props) => {
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
	
	const seo: NextSeoProps = {
		title: "pandome",
		description: "free and private file hosting."
	};

	return (
		<DragDropLayout seo={seo} {...state} >
			<Container direction="column" width="90vw" minHeight="30vh"
				justifyContent="flex-end" alignItems="center">

				<Hero title="p(a)ndo.me" subtitle="max 1GB upload"
					hostname={props.hostname} />
				<UploadTool options={state.options}
					auth={state.auth}/>
			</Container>

			<Main direction="column" width="90vw"
				justifyContent="center" alignItems="center">

				<FileList history={state.history}
									hostname={props.hostname} />

			</Main>
		</DragDropLayout>
	);
};

IndexPage.getInitialProps = (ctx) => {
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

	// const auth_store = authStore;
	// const history_store = historyStore;
	// const option_store = optionStore;
	
	// const auth = cookies['authentication'];
	// const history = cookies['upload-history'];
	// const options = cookies['upload-option'];

	// auth ? auth_store.setState(JSON.parse(auth), true) : undefined;
	// history ? history_store.setState(JSON.parse(history), true) : undefined;
	// options ? option_store.setState(JSON.parse(options), true) : undefined;
		
	// props.auth = JSON.parse(auth);
	// props.history = JSON.parse(history);
	// props.options = JSON.parse(options);

	return props;
};

export default IndexPage;
