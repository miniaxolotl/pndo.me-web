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
import DragDropLayout from '../components/layouts/DragDropLayout';
import { SyntheticEvent } from 'react';
import { dragIn, dragOut, drop, upload } from '../scripts/DragDropUpload';

import { parseCookies } from 'nookies'
import { FaSignOutAlt, FaArrowAltCircleUp,
	FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

import config from '../config.json';

/** Page */
const Page: NextPage<RootState> = () => {

	const rootState
		= useSelector((state: RootState) => state);
	const loggedIn
		= useSelector((state: RootState) => state.authorization.loggedIn);
	const historyList
		= useSelector((state: RootState) => state.history.list);

	const authLink: {
		href: string,
		icon: JSX.Element,
	} = {
		href: "123",
		icon: <FaSignOutAlt />,
	};
	
	const links: {
		href: string,
		icon: JSX.Element,
	}[] = [{
		href: "TODO",
		icon: <FaArrowAltCircleUp />,
	},{
		href: "TODO",
		icon: <FaQuestionCircle />,
	},{
		href: "TODO",
		icon: <FaUserCircle />,
	}];

	const headProps = {
		title: config.title,
		description: config.description,
		url: config.url,
		ogTitle: config.title,
		ogDescription: config.description,
		ogUrl: config.url,
		// ogImages?: OpenGraphImages[];
		ogSiteName: config.og.site,
		twSite: config.tw.site,
	}

	const dragInFunc = (e) => {

	};

	const dragOut = (e) => {

	};

	const dropFunc = (e) => {

	};

	const uploadFunc = (e) => {

	};

	return (
		<DragDropLayout
		dragInFunc={dragIn} dragOutFunc={dragOut}
		dropFunc={dropFunc} authorization={null}
		authLink={authLink} links={links}
		headProps={headProps}>

			<form id="form" encType="multipart/form-data">
				<div className="">
					<label id="file-input-label" className="file-input outline">
						select or drop files
						<input type="file" id="file" name="file" onChange={uploadFunc} />
					</label>
					{
						loggedIn ? 
						<label>
							private: 
							<input type="checkbox" value="protected" />
						</label> : null
					}
				</div>
			</form>
		</DragDropLayout>
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