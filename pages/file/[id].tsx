// pages/index.tsx
import { useSelector } from 'react-redux';
import { NextPage } from 'next';

import DefaultLayout from '../../components/layouts/default.layout';
import FileDisplay from '../../components/filedisplay';

import config from '../../res/config.json';
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

const Page: NextPage<RootState> = () => {

	// const router = useRouter();
	const rootState = useSelector((state: RootState) => state);
	// const display = useSelector((state: RootState) => state.display);

	const authorization = rootState?.authorization;

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

	return (
		<DefaultLayout
		authorization={authorization}
		authLink={authLink} links={links}
		headProps={headProps}>
			<FileDisplay data={null}>
			</FileDisplay>
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