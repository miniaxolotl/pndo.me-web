// pages/index.tsx
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';

import { useRouter } from 'next/router';
import DefaultLayout from '../../components/layours/DefaultLayout';
import { RootAction, ActionGroup, HistoryAction } from '../../store/_types';
import { parseCookies } from 'nookies';
import FileDisplay from '../../components/FileDisplay';

import fetch from 'node-fetch';

const Page: NextPage<RootState> = () => {

	const router = useRouter();
	const rootState = useSelector((state: RootState) => state);
	const display = useSelector((state: RootState) => state.display);

	const authorization = rootState?.authorization;

	return (
		<DefaultLayout authorization={authorization}>
			<FileDisplay data={display}>
			</FileDisplay>
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = async (ctx) => {

	const action: RootAction = { group: ActionGroup.ROOT };
	ctx.store.dispatch({ type: action });

	let rootState: RootState = ctx.store.getState();
	let initialProps: RootState = rootState;

	if (ctx.isServer) {
		const cleanupAction: RootAction = {
			group: ActionGroup.HISTORY,
			action:HistoryAction.CLEANUP
		};
		ctx.store.dispatch({ type: cleanupAction });
		
		const history = parseCookies(ctx).history;
		if(history) {
			let filteredHistory = JSON.parse(history);
			filteredHistory = filteredHistory.filter((e) => !e.delta);
			initialProps.history.list = filteredHistory;
		}
	}
	
	/* load persistent parameters */
	
	const url = 'http://localhost:5656/info/'+ctx.query.id;
	
	await fetch(url, {
		method: 'post',
	}).then(async (res) => {
		const data: any = JSON.parse(await res.text());
		initialProps.display = data;
	});

	return initialProps;
};


export default Page;