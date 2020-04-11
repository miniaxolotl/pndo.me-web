/**
 * dashboard.ts
 * - User homepage.
 * - Handles user authentication.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { RootAction, ActionGroup, HistoryAction } from '../store/_types';
import HybridForm from '../components/forms/HybridForm';
import DefaultLayout from '../components/layours/DefaultLayout';
import { parseCookies } from 'nookies';

interface Props {
	authorization: AuthorizationState;
	history: HistoryState;
}

/** Page */
const Page: NextPage<Props> = props => {
	const rootState = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const authorization = rootState.authorization;
	const history = rootState.history;

	return (
		<DefaultLayout>
			<HybridForm loginFunc={null} registerFunc={null}></HybridForm>
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = (ctx) => {

	const action: RootAction = { group: ActionGroup.ROOT };
	ctx.store.dispatch({ type: action });

	let rootState: RootState = ctx.store.getState();
	let initialProps: RootState = rootState;

	if (ctx.isServer) {
		const cleanupAction: RootAction = {
			group: ActionGroup.HISTORY,
			action: HistoryAction.CLEANUP
		};
		ctx.store.dispatch({ type: cleanupAction });
		
		const history = parseCookies(ctx).history;
		if(history) {
			let filteredHistory = JSON.parse(history);
			filteredHistory = filteredHistory.filter((e) => !e.delta);
			initialProps.history.list = filteredHistory;
		}
	}
	return initialProps;
};


export default Page;