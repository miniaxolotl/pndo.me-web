import { motion } from 'framer-motion';

import Head from '../partials/head';
import NavBar from '../partials/navbar';
import ActiveLink from '../activelink';
import { OpenGraphImages } from 'next-seo/lib/types';
	
import config from '../../res/config.json';

import styles from "./dragdrop.layout.module.scss"
import { FaHeart } from 'react-icons/fa';

interface Props {
	authorization?: AuthorizationState;
	logoutFunc: (e: any) => any;
	dragInFunc?: (e: any) => any;
	dragOutFunc?: (e: any) => any;
	dropFunc?: (e: any) => any;
	authLink: {
		href: string,
		icon: JSX.Element,
	},
	links: NavLink[];
	headProps: HeadProp,
};

const DragDropLayout: React.FunctionComponent<Props> = (props) => {

	const navigationVariants = {
		initial: { opacity: 0, y: '100vw' },
		enter: { opacity: 1, y: '0vw', transition: { duration: 0.4 } },
		exit: { opacity: 0, y: '100vw', transition: { duration: 0.6 } },
	}
	
	return (
		<div id="body"
		className={`${styles.body} text-center display-flex center`}
		onDragEnter={props.dragInFunc} onDragOver={props.dragInFunc} >
			
			<div id="screen" className="full screen display-hidden"
				onDragEnter={props.dragInFunc} onDragOver={props.dragInFunc}
				onDragLeave={props.dragOutFunc} onDrop={props.dropFunc}/>
			<Head {...props.headProps} />

			<div className="">
				<div id="navbar" className={styles.navbar}>
					<h1 className={styles.title}>
						<ActiveLink href="/">
							{ config.title }
						</ActiveLink>
					</h1>
					<NavBar
					authorization={props.authorization}
					logoutFunc={props.logoutFunc}
					links={props.links}
					authLink={props.authLink} />
				</div>
				
				<motion.div initial="initial" animate="enter" exit="exit" 
				variants={navigationVariants}
				className={styles.motionDiv}>
					<div  id="masthead" className="container" >
						{ props.children }
					</div>
				</motion.div>

			</div>
			
			<footer>
			{/* <small>With&nbsp;<FaHeart />&nbsp;from Elias Mawa</small> */}
			{/* <small><a href="javascript:void(0)" id="theme">lights off!</a></small> */}
			</footer>
		</div>
	);
};

export default DragDropLayout;