/**
 * index.ts
 * - Application homepage.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { RootAction, ActionGroup, HistoryAction } from '../store/_types';
import DefaultLayout from '../components/layours/DefaultLayout';
import { SyntheticEvent } from 'react';
import { dragIn, dragOut, drop, upload } from '../scripts/DragDropUpload';
import DownloadList from '../components/DownloadList';

import { parseCookies, setCookie, destroyCookie } from 'nookies'

interface Props {
	authorization: AuthorizationState;
	history: HistoryState;
}

/** Page */
const Page: NextPage<RootState> = () => {

	const dispatch = useDispatch();

	const rootState = useSelector((state: RootState) => state);
	const historyList = useSelector((state: RootState) => state.history.list);

	/********* functions *********/

	const progressFunc = (p: ProgressEvent, id: FileUID) => {
		const action: RootAction = {
			group: ActionGroup.HISTORY,
			action: HistoryAction.PROGRESS,
		};
		
		dispatch({
			type: action,
			progress: p,
			uid: id,
		});
	};

	const dropFunc = async (event: SyntheticEvent<HTMLDivElement>) => {
		const responce = await drop(event, progressFunc);

		const action: RootAction = {
			group: ActionGroup.HISTORY,
			action: HistoryAction.ADD,
		};
		
		if(responce.status == 200) {
			dispatch({
				type: action,
				item: responce.data,
			});
		}
	}

	const uploadFunc = async (event:  React.ChangeEvent<HTMLInputElement>) => {
		const responce = await upload(event, progressFunc);

		const action: RootAction = {
			group: ActionGroup.HISTORY,
			action: HistoryAction.ADD,
		};

		if(responce.status == 200) {
			dispatch({
				type: action,
				item: responce.data,
			});
		}
	}

	const filterFunc = (id: string, e: any) => {
		e.preventDefault();
		const element = e.target;
		
		const action: RootAction = {
			group: ActionGroup.HISTORY,
			action: HistoryAction.DELETE,
		};

		dispatch({
			type: action,
			id: id,
		});
	};

	/********* component *********/

	return (
		<DefaultLayout dragInFunc={dragIn} dragOutFunc={dragOut}
		dropFunc={dropFunc} authorization={null}>

			<form id="form" encType="multipart/form-data">
				<div className="">
					<label id="file-input-label" className="file-input outline">
						select or drop files
						<input type="file" id="file-input" name="file" onChange={uploadFunc} />
					</label>
				</div>
			</form>
			<DownloadList data={historyList} filterFunc={filterFunc} />
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
	return initialProps;
};

export default Page;