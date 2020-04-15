import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ActionGroup, AuthorizationAction } from '../../store/_types';
import { motion, MotionProps } from 'framer-motion';
import { IconType } from 'react-icons/lib/cjs';

import Head from './_Head';
import NavBar from './_NavBar';
import ActiveLink from './_ActiveLink';

import { FaSignOutAlt, FaArrowAltCircleUp, 
	FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
	
import config from '../../config.json';
import { OpenGraphImages } from 'next-seo/lib/types';

interface Props {
	authorization?: AuthorizationState;
	logoutFunc?: (e: any) => any;
	dragInFunc?: (e: any) => any;
	dragOutFunc?: (e: any) => any;
	dropFunc?: (e: any) => any;
	authLink: {
		href: string,
		icon: JSX.Element,
	},
	links: {
		href: string,
		icon: JSX.Element,
	}[];
	headProps: {
		title?: string;
		description?: string;
		url?: string;
		ogTitle?: string;
		ogDescription?: string;
		ogUrl?: string;
		ogImages?: OpenGraphImages[];
		ogSiteName?: string;
		twHandle?: string;
		twSite?: string;
	}
};

const DragDropLayout: React.FunctionComponent<Props> = (props) => {

	const navigationVariants = {
		initial: { opacity: 0, y: '100vw' },
		enter: { opacity: 1, y: '0vw', transition: { duration: 0.4 } },
		exit: { opacity: 0, y: '100vw', transition: { duration: 0.6 } },
	}
	
	/********* component *********/
	  
	return (
		<div id="body" className="text-center" onDragEnter={props.dragInFunc} onDragOver={props.dragInFunc}>
			
			<Head {...props.headProps} />

			<div id="screen" className="full screen display-hidden"
			onDragEnter={props.dragInFunc} onDragOver={props.dragInFunc}
			onDragLeave={props.dragOutFunc} onDrop={props.dropFunc}/>

			<div id="navbar" className="">
				<h1 className="nav-link upload">
					<ActiveLink href="/">
						config.
					</ActiveLink>
				</h1>
				<NavBar
				authorization={props.authorization}
				logoutFunc={props.logoutFunc}
				links={props.links}
				authLink={props.authLink} />
			</div>
			
			<motion.div initial="initial" animate="enter" exit="exit" 
			variants={navigationVariants}>
				<div  id="masthead" className="container" >
					{ props.children }
				</div>
			</motion.div>

		</div>
	);
};

export default DragDropLayout;