import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import DefaultLayout from '../components/layouts/default.layout';

import { parseCookies } from 'nookies'
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle,
	FaUserCircle, FaLock, FaEyeSlash } from 'react-icons/fa';

import { RootAction, ActionGroup,
	UploadHistoryAction, 
	AuthorizationAction} from '../store/_store.types';
import config from '../config.json';

import styles from './index.module.scss';
import HybridForm from '../components/forms/hybrid.form';
import { attemptLogin, attemptRegister } from '../scripts/authentication.script';

const Page: NextPage<RootState> = (props) => {

	const dispatch = useDispatch();
	
	const authorization
		= useSelector((state: RootState) => state.authorization);

	const authLink: {
		href: string,
		icon: JSX.Element,
	} = {
		href: "/",
		icon: <FaSignOutAlt />,
	};
	
	const links: {
		key: number,
		href: string,
		icon: JSX.Element,
	}[] = [{
		key: 0,
		href: "/",
		icon: <FaArrowAltCircleUp />,
	},{
		key: 1,
		href: "/faq",
		icon: <FaQuestionCircle />,
	},{
		key: 2,
		href: "/dashboard",
		icon: <FaUserCircle />,
	}];

	const headProps = {
		title: config.title,
		description: config.description,
		url: config.url,
		ogTitle: config.title,
		ogDescription: config.description,
		ogUrl: config.url,
		ogSiteName: config.og.site,
		twSite: config.tw.site,
	}

	const loginFunc = async (username: string, password: string) => {
		const data = await attemptLogin(username, password);

		if(data.status == 200) {
			const authorization = data.message as unknown as Authorization;
			
			const action: RootAction = {
				group: ActionGroup.AUTHORIZATION,
				action: AuthorizationAction.AUTHORIZE,
			};

			const item: AuthorizationState = {
				loggedIn: true,
				authorization: authorization.authorization,
				username: authorization.user.username,
				profile: authorization.user.profile,
			}

			dispatch({
				type: action,
				...item,
			});
		}

		return data.status == 200;
	};

	const registerFunc = async (username: string, password: string) => {
		const data = await attemptRegister(username, password);

		if(data.status == 200) {
			const authorization = data.message as unknown as Authorization;
			
			const action: RootAction = {
				group: ActionGroup.AUTHORIZATION,
				action: AuthorizationAction.AUTHORIZE,
			};

			const item: AuthorizationState = {
				loggedIn: true,
				authorization: authorization.authorization,
				username: authorization.user.username,
				profile: authorization.user.profile,
			}

			dispatch({
				type: action,
				...item,
			});
		}

		return data.status == 200;
	};

	return (
		<DefaultLayout
		authorization={authorization}
		authLink={authLink} links={links}
		headProps={headProps}>
			{
				(() => {
					if(authorization.loggedIn) {
						return (
							null
						);
					} else {
						return (
							<HybridForm
							loginFunc={loginFunc}
							registerFunc={registerFunc} />
						)
					}
				})()
			}
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = (ctx) => {

	const rootState: RootState = ctx.store.getState();
	const initialProps: RootState = rootState;

	return initialProps;
};

export default Page;