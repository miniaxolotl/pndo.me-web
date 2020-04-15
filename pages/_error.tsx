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
import { RootAction, ActionGroup } from '../store/_types';
import DefaultLayout from '../components/layouts/DefaultLayout';
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

import config from '../config.json';

/** Page */
const Page: NextPage<RootState> = () => {

	const rootState = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const authorization = rootState.authorization;
	const history = rootState.history;

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

	return (
		<DefaultLayout
		authLink={authLink} links={links}
		headProps={headProps}>

			<h1> OOF: Page not found! </h1>
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = ({ store, isServer }) => {
	if (isServer) {
		/* Do some staff */
	}

	// const action: RootAction = { group: ActionGroup.ROOT };
	
	// store.dispatch({ type: action });

	// const rootState: RootState = store.getState();
	// const initialProps: Props = rootState;

	// return initialProps;
	return null;
};

export default Page;