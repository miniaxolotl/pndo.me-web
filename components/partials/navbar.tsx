import ActiveLink from '../activelink';

import styles from "./navbar.module.scss"

interface Props {
	authorization: AuthorizationState;
	logoutFunc: (e: React.MouseEvent<HTMLInputElement>) => void;
	authLink: {
		href: string,
		icon: JSX.Element,
	},
	links: {
		key: number,
		href: string,
		icon: JSX.Element,
	}[];
}

const NavBar: React.FunctionComponent<Props> = (props) => (
	
		<div>
			{
				(() => {
					let linkList = [];

					props.links.forEach((value) => {
						linkList.push(
							<span className={styles.navLink} key={value.key}>
								<ActiveLink href={`${value.href}`}>
										{value.icon}
								</ActiveLink>
							</span>
						);
					});

					return linkList;
				})()
			}

			{
				(() => {
					if(props.authorization.loggedIn) {
						return (
							<ActiveLink 
							clickFunc={props.logoutFunc} 
							href={`${props.authLink.href}`}>		

								<span className={styles.navLink}>
									{props.authLink.icon}
								</span>
							</ActiveLink>
						);
					} else {
						return null;
					}
				})()
			}
		</div>
	);

export default NavBar;