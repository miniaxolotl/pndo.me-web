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
	dragInFunc?: (e: any) => any;
	dragOutFunc?: (e: any) => any;
	dropFunc?: (e: any) => any;
};

const DefaultLayout: React.FunctionComponent<Props> =
	({ children, authorization, dragInFunc, dragOutFunc, dropFunc }) => {
		
	const rootState = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	const router = useRouter();

	/********* states *********/

	/********* functions *********/
	
	const logout = (e: React.MouseEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if(status) {
			dispatch({
				type: {
					type: ActionGroup.AUTHORIZATION,
					action: AuthorizationAction.LOGOUT,
				},
			});
			router.replace("/");
		}
	};

	/********* other *********/

	const navigationVariants = {
		initial: { opacity: 0, y: '100vw' },
		enter: { opacity: 1, y: '0vw', transition: { duration: 0.4 } },
		exit: { opacity: 0, y: '100vw', transition: { duration: 0.4 } },
	}
	
	/********* component *********/
	  
	return (
		<div id="body" className="text-center" onDragEnter={dragInFunc} onDragOver={dragInFunc}>

			<div id="screen" className="full screen display-hidden"
			onDragEnter={dragInFunc} onDragOver={dragInFunc}
			onDragLeave={dragOutFunc} onDrop={dropFunc}/>

			<Head />
			<div id="navbar" className="">
				<h1 className="nav-link upload">
					<ActiveLink href="/">
						pandome
					</ActiveLink>
				</h1>
				<NavigationBar authorization={authorization}
				logoutFunc={logout} />
			</div>
			
			<motion.div initial="initial" animate="enter" exit="exit" 
			variants={navigationVariants}>
				<div  id="masthead" className="container" >
					{ children }
				</div>
			</motion.div>

		</div>
	);
};

export default DefaultLayout;