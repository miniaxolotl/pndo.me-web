import { FiLogIn, FiLogOut, FiMenu, FiUserPlus } from 'react-icons/fi';
import { Flex, Icon, IconButton, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Spacer, useColorMode } from '@chakra-ui/react';

import style from './MainMenuButton.module.css';

interface Props { 
	auth: AuthState;
}

export const MainMenuButton: React.FunctionComponent<Props> = (_props: Props) => {
	const { colorMode } = useColorMode();

	return(
		<Flex position='fixed' top='2rem' left='2rem' borderRadius='md' shadow='dark-lg'
			className={colorMode === 'dark' ? style.background : style.backgroundLight}>
			<Menu autoSelect={false}>
				<MenuButton as={IconButton} colorScheme="pink" icon={<FiMenu />}
					aria-label="Options" _focus={{ boxShadow: 'none' }} islazy='true'>
				Profile
				</MenuButton>
				<MenuList>
					<MenuGroup title="Profile"
						className={colorMode === 'dark' ? style.label : style.labelLight}>
						<MenuItem> My Account </MenuItem>
					</MenuGroup>
					<MenuDivider />
					<MenuGroup title="Help"
						className={colorMode === 'dark' ? style.label : style.labelLight}>
						<MenuItem about='Open android app' isDisabled> Android App (soon) </MenuItem>
						<MenuItem about='View documentation' isDisabled> API Documentation (soon) </MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>
			
			<Spacer width="0.5rem" />
			
			<Flex alignItems="center">
				{(() => {
					if(_props.auth.loggedIn) {
						return (
							<Flex>
								<Link> { _props.auth.username } <Icon mx="1px" as={FiUserPlus} /> </Link>
								<Spacer width="0.5rem" />
								<Link> Logout <Icon mx="1px" as={FiLogOut} /> </Link>
							</Flex>
						);
					} else {
						return (
							<Flex>
								<Link href='/'> Register <Icon mx="1px" as={FiUserPlus} /> </Link>
								<Spacer width="0.5rem" />
								<Link href='/'> Login <Icon mx="1px" as={FiLogIn} /> </Link>
							</Flex>
						);
					}
				})()}
			</Flex>

			<Spacer width="0.5rem" />
		</Flex>
	);
};