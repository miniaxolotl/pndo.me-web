// pages/index.tsx
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';

import DefaultLayout from '../../components/layouts/default.layout';
import FileDisplay from '../../components/filedisplay';

import config from '../../res/config.json';
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle, FaUserCircle, FaCloudUploadAlt, FaSearch, FaQuestion, FaUserAlt } from 'react-icons/fa';
import { getFile } from '../../scripts/display.script';
import { OpenGraphImages } from 'next-seo/lib/types';
import { SyntheticEvent } from 'react';
import { RootAction, ActionGroup, AuthorizationAction } from '../../store/_store.types';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

const Page: NextPage<RootState & any> = (props) => {

	const router = useRouter();
	const rootState = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	// const display = useSelector((state: RootState) => state.display);

	const authorization = rootState?.authorization;

	const logout = (event: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => {
		const action: RootAction = {
			group: ActionGroup.AUTHORIZATION,
			action: AuthorizationAction.LOGOUT,
		};

		dispatch({
			type: action,
		});
	};
	
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

	let images: OpenGraphImages[] = [];

	if(props.data.status != 200) {

		const headProps: HeadProp = {
			title: props.data.message,
			description: props.data.message,
			url: config.url,
			ogTitle: props.data.message,
			ogDescription: props.data.message,
			ogUrl: config.url,
			ogSiteName: config.og.site,
			twSite: config.tw.site,
			twHandle: config.tw.site,
			ogImages: images,
		}

		return (
			<DefaultLayout
			authorization={authorization}
			authLink={authLink} links={links}
			logoutFunc={logout}
			headProps={headProps}>
				<h1> OOF: A bruh moment occured... </h1>
				<p> {props.data.message} </p>
			</DefaultLayout>
		)
	} else {
		if(props.data.type.includes("jpeg") || props.data.type.includes("png") || props.data.type.includes("gif") || props.data.type.includes("webp") || props.data.type.includes("jpg") || props.data.type.includes("svg") || props.data.type.includes("apng")){
			images = [{
				url: config.api_file+"/download/"+props.data.file_id,
			}];
		}
	}

	const headProps = {
		title: "file: " + props.data.filename,
		description: "download "+props.data.filename+" from pandome. Free file storage.",
		url: config.url,
		ogTitle: "file: " + props.data.filename,
		ogDescription: "download "+props.data.filename+" from pandome. Free file storage.",
		ogUrl: config.url,
		ogSiteName: config.og.site,
		twSite: config.tw.site,
		twHandle: config.tw.site,
		ogImages: images,
	}

	return (
		<DefaultLayout
		authorization={authorization}
		authLink={authLink} links={links}
		logoutFunc={logout}
		headProps={headProps}>
			<FileDisplay data={props.data} authorization={authorization}>
			</FileDisplay>
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = async (ctx) => {
	const rootState: RootState = ctx.store.getState();
	const initialProps: RootState & any = rootState;

	let authorization;
	
	try {
		const cookies = parseCookies(ctx);
		
		if(cookies.authorization) {
			authorization = JSON.parse(cookies.authorization);
		}
	} finally {
		initialProps.data = await getFile(ctx.query.id as string, authorization);
	}

	return initialProps;
};

export default Page;