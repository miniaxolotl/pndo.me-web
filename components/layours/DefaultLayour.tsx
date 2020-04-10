/**
 * Default.ts
 * Default layout
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 19-28-12
 */

import Head from '../Head';
import NavigationBar from '../NavigationBar';
import ActiveLink from '../ActiveLink';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ActionGroup, AuthorizationAction } from '../../store/_types';
import { motion, MotionProps } from 'framer-motion';

interface Props {
	authorization?: AuthorizationState;
	logoutFunc?: (e: React.MouseEvent<any>) => boolean;
	dragInFunc?: (e: any) => any;
	dragOutFunc?: (e: any) => any;
};

const DefaultLayout: React.FunctionComponent<Props> =
	({ children, authorization, dragInFunc }) => {

	const app_state = useSelector((state: RootState) => state)
	const dispatch = useDispatch();
	const router = useRouter();
	
	const load = (e) => {
		const element = e.target as HTMLAnchorElement;
		console.log(element);
		console.log("Hello World!");
		
		element.classList.add("bounce-enter-active");
	};


	const logout = (e: React.MouseEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();

		let status = false;

		if(status) {
			dispatch({
				type: {
					type: ActionGroup.AUTHORIZATION,
					action: AuthorizationAction.LOGOUT,
				},
			});
			router.replace("/");
		}

		return status;
	};

	const variants = {
		initial: { y: '100vw' },
		enter: { y: '0vw', transition: { duration: 0.4 } },
		exit: { y: '100vw', transition: { duration: 0.4 } },
	}
	  
	return (
		<div id="body" className="text-center flex-direction-vertical" onDragEnter={dragInFunc} onDragOver={dragInFunc}>

			<Head />
			<div id="navbar" className="">
				<h1 className="nav-link upload">
					<ActiveLink href="/">
						pandome
					</ActiveLink>
				</h1>
				<NavigationBar authorization={authorization} logoutFunc={logout} />
			</div>
			
			<motion.div initial="initial" animate="enter" exit="exit" 
			variants={variants}>
				<div  id="masthead" className="container" onLoad={load}>
					{ children }
				</div>
			</motion.div>

		</div>
	);
};

export default DefaultLayout;