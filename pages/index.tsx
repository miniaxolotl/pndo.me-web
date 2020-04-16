import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import DragDropLayout from '../components/layouts/dragdrop.layout';

import { parseCookies } from 'nookies'
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle,
	FaUserCircle, FaLock, FaEyeSlash } from 'react-icons/fa';

import { RootAction, ActionGroup,
	UploadHistoryAction } from '../store/_store.types';
import config from '../config.json';

import styles from './index.module.scss';

const Page: NextPage<RootState> = (props) => {

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

	const dragInFunc = () => {};

	const dragOutFunc = () => {};

	const dropFunc = () => {};

	const uploadFunc = () => {};

	return (
		<DragDropLayout
		dragInFunc={dragInFunc} dragOutFunc={dragOutFunc}
		dropFunc={dropFunc} authorization={authorization}
		authLink={authLink} links={links}
		headProps={headProps}>

			<form id="form" encType="multipart/form-data">
				<div className="">
					<label id="file-input-label"
					className={`${styles.uploadLabel} file-input outline`}>
						select or drop files
						<input type="file" id="upload_file" name="upload_file"
						onChange={uploadFunc}
						className={styles.button} />
					</label>
					<div>
						<span className={`${styles.tooltipPrivate} tooltip`}>
							<FaLock />
							{/* <FaLockOpen /> */}
							<span
							className={`${styles.tooltipText} tooltip-text`}>
								should you be the only one able to access the file?
							</span>
						</span>
						<span className={`${styles.tooltipHidden} tooltip`}>
							{/* <FaEye /> */}
							<FaEyeSlash />
							<span
							className={`${styles.tooltipText} tooltip-text`}>
								should the file be publicly searchable?
							</span>
						</span>
					</div>
				</div>
			</form>
		</DragDropLayout>
	);
};

/** Initial props */
Page.getInitialProps = (ctx) => {

	const rootState: RootState = ctx.store.getState();
	const initialProps: RootState = rootState;

	return initialProps;
};

export default Page;