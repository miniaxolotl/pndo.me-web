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

interface Props {
	authorization?: AuthorizationState;
	logoutFunc?: (e: any) => any;
	dragInFunc?: (e: any) => any;
	dragOutFunc?: (e: any) => any;
	dropFunc?: (e: any) => any;
};

const DefaultLayout: React.FunctionComponent<Props> = (props) => {

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

	const navigationVariants = {
		initial: { opacity: 0, y: '100vw' },
		enter: { opacity: 1, y: '0vw', transition: { duration: 0.4 } },
		exit: { opacity: 0, y: '100vw', transition: { duration: 0.6 } },
	}
	
	/********* component *********/
	  
	return (
		<div id="body" className="text-center" onDragEnter={props.dragInFunc} onDragOver={props.dragInFunc}>
			
			<Head />

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
				links={links}
				authLink={authLink} />
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

export default DefaultLayout;