import ActiveLink from '../activelink';

import styles from "./navbar.module.scss"

interface Props {
	authorization: AuthorizationState;
	logoutFunc: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	authLink: NavLink,
	links: NavLink[];
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
				props.authorization.loggedIn ? 
					<a onClick={props.logoutFunc}>
						<span className={`${styles.navLink} ${styles.logout}`}>
							{props.authLink.icon}
						</span>
					</a> : null
			}
		</div>
	);

export default NavBar;