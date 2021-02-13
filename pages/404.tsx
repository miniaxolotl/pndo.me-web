import { NextPage } from 'next';
import { useState } from 'react';

import nookies from 'nookies';
import { State } from 'zustand';

import { Hero } from '../components/Hero';
import { Container } from '../components/Container'
import { Layout } from '../components/Layout'
import { Main } from '../components/Main';

import { authStore } from '../store/auth';
import { historyStore } from '../store/history';
import { optionStore } from '../store/option';
import { HistoryAction } from '../types';
import { Heading } from '@chakra-ui/react';

interface Props {
	auth: AuthState & State;
	options: OptionState & State;
	history: HistoryState & State;
	hostname: string;
};

const Error404: NextPage<Props> = (props) => {
	const [first, useFirst] = useState(false);
	const dispatchHistory = historyStore(state => state.dispatch);

	const cookies = nookies.get();

	const auth = cookies['authentication'];
	const history = cookies['upload-history'];
	const options = cookies['upload-option'];

	if(!first) {
		authStore.setState(auth ? JSON.parse(auth) : undefined);
		optionStore.setState(options ? JSON.parse(options) : undefined);
		historyStore.setState(history ? JSON.parse(history) : undefined);
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
	
	return (
		<Layout {...state}>
			<Container direction="column" width="90vw" minHeight="30vh"
				justifyContent="flex-end" alignItems="center">

				<Hero title="p(a)ndo.me" hostname={props.hostname} />
			</Container>

			<Main direction="column" width="90vw"
				justifyContent="center" alignItems="center">

				<Container>
					<Heading> 404 - Page not found </Heading>
				</Container>
			</Main>
		</Layout>
	);
};

export default Error404;
