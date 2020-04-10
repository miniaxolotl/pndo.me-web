/**
 * Header.tsx
 * Header
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-02-20
 */

import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

import ActiveLink from './ActiveLink';

interface Props {
	authorization: AuthorizationState;
	logoutFunc: (e: React.MouseEvent<HTMLInputElement>) => boolean;
}

const NavigationBar: React.FunctionComponent<Props> =
	({ authorization, logoutFunc }) => (
		<div className="nav-containe">
			<ActiveLink href="/">		
				<span className="nav-link upload">
					<FaArrowAltCircleUp />
				</span>
			</ActiveLink>
			
			<ActiveLink href="/help">	
				<span className="nav-link">
					<FaQuestionCircle />
				</span>
			</ActiveLink>
			
			<ActiveLink href="/dashboard">		
        		<span className="nav-link">
					<FaUserCircle />
				</span>
			</ActiveLink>

			{
				authorization?.loggedIn ? 
					<ActiveLink clickFunc={logoutFunc} href="/dashboard">		
						<span className="nav-link">
							<FaSignOutAlt />
						</span>
					</ActiveLink> : null
			}
		</div>
	);

export default NavigationBar;