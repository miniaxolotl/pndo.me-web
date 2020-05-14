import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import DefaultLayout from '../components/layouts/default.layout';

import { FaSignOutAlt, FaCloudUploadAlt, FaSearch, FaQuestion, FaUserAlt } from 'react-icons/fa';

import { RootAction, ActionGroup,
	AuthorizationAction} from '../store/_store.types';
import config from '../res/config.json';

import HybridForm from '../components/forms/hybrid.form';
import { registerRequest, loginRequest } from '../scripts/authentication.script';
import { SyntheticEvent } from 'react';

const Page: NextPage<RootState> = () => {
	const dispatch = useDispatch();
	
	const authorization
		= useSelector((state: RootState) => state.authorization);

	const authLink: NavLink = {
		href: "/",
		icon: <FaSignOutAlt />,
	};
	
	const links: NavLink[] = [{
		key: 0,
		href: "/",
		icon: <FaCloudUploadAlt />,
	},{
		key: 1,
		href: "/search",
		icon: <FaSearch />,
	},{
		key: 2,
		href: "/faq",
		icon: <FaQuestion />,
	},{
		key: 3,
		href: "/dashboard",
		icon: <FaUserAlt />,
	}];

	const headProps: HeadProp = {
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
		const data = await loginRequest(username, password);

		if(data.status == 200) {
			const authorization = data.message as any;
			
			const action: RootAction = {
				group: ActionGroup.AUTHORIZATION,
				action: AuthorizationAction.AUTHORIZE,
			};

			const item: AuthorizationState = {
				loggedIn: true,
				authorization: authorization.authorization,
				username: authorization.payload.username,
				display_name: authorization.display_name,
				profile_id: authorization.payload.profile_id,
				flags: authorization.payload.flags,
			}

			dispatch({
				type: action,
				...item,
			});
		}

		return data.status == 200;
	};

	const registerFunc = async (username: string, password: string) => {
		const data = await registerRequest(username, password);

		if(data.status == 200) {
			const authorization = data.message as any;
			
			const action: RootAction = {
				group: ActionGroup.AUTHORIZATION,
				action: AuthorizationAction.AUTHORIZE,
			};

			const item: AuthorizationState = {
				loggedIn: true,
				authorization: authorization.authorization,
				username: authorization.payload.username,
				display_name: authorization.payload.display_name,
				profile_id: authorization.payload.profile_id,
				flags: authorization.payload.flags,
			}

			dispatch({
				type: action,
				...item,
			});
		}

		return data.status == 200;
	};

	const logout = (event: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => {
		
		const action: RootAction = {
			group: ActionGroup.AUTHORIZATION,
			action: AuthorizationAction.LOGOUT,
		};

		dispatch({
			type: action,
		});
	};

	return (
		<DefaultLayout
		authorization={authorization}
		authLink={authLink} links={links}
		logoutFunc={logout}
		headProps={headProps}>
			{
				(() => {
					if(authorization.loggedIn) {
						return (
							'coming soon™️'
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