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
import DefaultLayout from '../components/layours/DefaultLayour';
import { SyntheticEvent } from 'react';
import { dragIn, dragOut, drop, upload } from '../scripts/DragDropUpload';
import DownloadList from '../components/DownloadList';

interface Props {
	authorization: AuthorizationState;
	history: HistoryState;
}

/** Page */
const Page: NextPage<RootState> = () => {

	const dispatch = useDispatch();

	const rootState = useSelector((state: RootState) => state);

	const authorization = rootState.authorization;
	const history = rootState.history;

	/********* functions *********/

	const dropFunc = async (event: SyntheticEvent<HTMLDivElement>) => {
		const responce = await drop(event);

		const action: RootAction = {
			group: ActionGroup.HISTORY,
			action: HistoryAction.ADD,
		};

		if(!responce.status) {
			dispatch({
				type: action,
				item: responce.data,
			});
		}
	}

	const uploadFunc = async (event:  React.ChangeEvent<HTMLInputElement>) => {
		const responce = await upload(event);

		const action: RootAction = {
			group: ActionGroup.HISTORY,
			action: HistoryAction.ADD,
		};

		if(!responce.status) {
			dispatch({
				type: action,
				item: responce.data,
			});
		}
	}

	/********* component *********/

	return (
		<DefaultLayout dragInFunc={dragIn} dragOutFunc={dragOut}
		dropFunc={dropFunc} authorization={authorization}>

			<form id="form" encType="multipart/form-data">
				<div className="">
					<label id="file-input-label" className="file-input outline">
						select or drop files
						<input type="file" id="file-input" name="file" onChange={uploadFunc} />
					</label>
				</div>
			</form>
			{authorization.admin}
			<DownloadList data={history.list} />
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = ({ store, isServer }) => {
	if (isServer) {
		/* Do some staff */
	}

	const action: RootAction = { group: ActionGroup.ROOT };

	store.dispatch({ type: action });

	const rootState: RootState = store.getState();
	const initialProps: Props = rootState;

	return initialProps;
};

export default Page;