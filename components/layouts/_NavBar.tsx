import ActiveLink from './_ActiveLink';
import { IconType } from 'react-icons/lib/cjs';

interface Props {
	authorization: AuthorizationState;
	logoutFunc: (e: React.MouseEvent<HTMLInputElement>) => void;
	authLink: {
		href: string,
		icon: JSX.Element,
	},
	links: {
		href: string,
		icon: JSX.Element,
	}[];
}

const NavBar: React.FunctionComponent<Props> = (props) => (
	
		<div className="nav-container">
			{
				(() => {
					let linkList = [];

					props.links.forEach((value, index) => {
						linkList.push(
							<ActiveLink href={`${value.href}`}>
								<span className="nav-link">
									{value.icon}
								</span>
							</ActiveLink>
						);
					});
				})()
			}

			{
				// (() => {
				// 	if(props.authorization.loggedIn) {
				// 		return (
				// 			<ActiveLink 
				// 			clickFunc={props.logoutFunc} 
				// 			href={`${props.authLink.href}`}>		

				// 				<span className="nav-link">
				// 					{props.authLink.icon}
				// 				</span>
				// 			</ActiveLink>
				// 		);
				// 	} else {
				// 		return null;
				// 	}
				// })()
			}
		</div>
	);

export default NavBar;