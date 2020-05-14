import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import DragDropLayout from '../components/layouts/dragdrop.layout';

import { parseCookies } from 'nookies'
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle,
	FaUserCircle, FaLock, FaEyeSlash, FaEye, FaLockOpen, FaSearch, FaSearchLocation, FaResearchgate, FaSearchengin, FaLongArrowAltUp, FaArrowUp, FaFileUpload, FaCloudUploadAlt, FaQuestion, FaUser, FaUserAlt } from 'react-icons/fa';

import { RootAction, ActionGroup,
	UploadHistoryAction, 
	UploadOptionAction,
	AuthorizationAction} from '../store/_store.types';
import config from '../res/config.json';

import styles from './index.module.scss';
import { SyntheticEvent } from 'react';
import { dragIn, dragOut, drop, upload } from '../scripts/dragdrop.script';
import UploadList from '../components/uploadlist';
import { LOADIPHLPAPI } from 'dns';

const Page: NextPage<RootState> = (props) => {

	const dispatch = useDispatch();
	
	const authorization
		= useSelector((state: RootState) => state.authorization);

	const uploadOption
		= useSelector((state: RootState) => state.uploadOption);

	const uploadHistory
		= useSelector((state: RootState) => state.uploadHistory);
		
	const uploadHistoryList
		= useSelector((state: RootState) => state.uploadHistory.uploadList);

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
	
	const dragInFunc = (event) => {
		dragIn(event);
	};

	const dragOutFunc = (event) => {
		dragOut(event);
	};

	const dropFunc = async (event) => {
		const data
			= await drop(event, progressFunc,
			authorization.authorization, uploadOption);

		if(data && data.status == 200) {
			const responce = data.message as FileMetadata;

			const action: RootAction = {
				group: ActionGroup.UPLOAD_HISTORY,
				action: UploadHistoryAction.ADD,
			};

			dispatch({
				type: action,
				payload: responce,
			});
		}
	};

	const uploadFunc = async (event) => {
		const data 
			= await upload(event, progressFunc,
			authorization, uploadOption);
			console.log(authorization);
			

		if(data && data.status == 200) {
			const responce = data.message as FileMetadata;

			const action: RootAction = {
				group: ActionGroup.UPLOAD_HISTORY,
				action: UploadHistoryAction.ADD,
			};

			dispatch({
				type: action,
				payload: responce,
			});
		}
	};

	const progressFunc = (progress: ProgressEvent, file_data) => {
		const action: RootAction = {
			group: ActionGroup.UPLOAD_HISTORY,
			action: UploadHistoryAction.PROGRESS,
		};

		const payload: any = {
			progress,
			...file_data,
		};

		dispatch({
			type: action,
			payload,
		});
	};

	const toggleProtectedFunc = () => {
		const action: RootAction = {
			group: ActionGroup.UPLOAD_OPTION,
			action: UploadOptionAction.TOGGLE_PROTECTED,
		};

		const item: UploadOptionState = {
			protected: !uploadOption.protected,
			hidden: uploadOption.hidden,
		}

		dispatch({
			type: action,
			...item,
		});
	}

	const toggleHiddenFunc = () => {
		const action: RootAction = {
			group: ActionGroup.UPLOAD_OPTION,
			action: UploadOptionAction.TOGGLE_HIDDEN,
		};

		const item: UploadOptionState = {
			protected: uploadOption.protected,
			hidden: !uploadOption.hidden,
		}

		dispatch({
			type: action,
			...item,
		});
	}

	const filterFunc = (file_id, event) => {

		const action: RootAction = {
			group: ActionGroup.UPLOAD_HISTORY,
			action: UploadHistoryAction.DELETE,
		};

		dispatch({
			type: action,
			file_id,
		});
	}

	return (
		<DragDropLayout
		dragInFunc={dragInFunc} dragOutFunc={dragOutFunc}
		dropFunc={dropFunc} authorization={authorization}
		authLink={authLink} links={links} logoutFunc={logout}
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
						<span 
						onClick={toggleProtectedFunc}
						className={`${styles.tooltipPrivate} tooltip`}>
						{
							(() => {
								if(uploadOption.protected) {
									return (
										<FaLock />
									)
								} else {
									return (
										<FaLockOpen
										className={`${styles.colorGreen}`} />
									)
								}
							})()
						}
							<span
							className={`${styles.tooltipText} tooltip-text`}>
								should you be the only one able to access the file?
							</span>
						</span>
						<span
						onClick={toggleHiddenFunc}
						className={`${styles.tooltipHidden} tooltip`}>
							{
								(() => {
									if(uploadOption.hidden) {
										return (
											<FaEyeSlash />
										)
									} else {
										return (
											<FaEye 
											className={`${styles.colorBlue}`} />
										)
									}
								})()
							}
							<span
							className={`${styles.tooltipText} tooltip-text`}>
								should the file be publicly searchable?
							</span>
						</span>
					</div>
				</div>
			</form>
			{
				<UploadList
				uploadList={uploadHistoryList}
				filterFunc={filterFunc} />
			}
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