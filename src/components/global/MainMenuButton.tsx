import Link from 'next/link';
import fetch from 'node-fetch';
import { Link as CLink, Flex, Icon, IconButton, Menu, MenuButton, MenuDivider,
	MenuGroup, MenuItem, MenuList, Spacer, Text, useColorMode } from '@chakra-ui/react';
import { FiLogIn, FiLogOut, FiMenu, FiUser, FiUserPlus } from 'react-icons/fi';
import React, { SyntheticEvent } from 'react';

import { AuthAction, UploadOptionAction } from '../../lib/store/store.enum';
import { useAuth, useUploadOption } from '../../lib/store/store';

import { config } from '../../res/config';
import style from './MainMenuButton.module.css';

interface Props { 
	auth: AuthState;
}

export const MainMenuButton: React.FunctionComponent<Props> = (_props: Props) => {
	const { colorMode } = useColorMode();
	const auth = useAuth((_state) => _state.dispatch);
	const upload_option_d = useUploadOption((_state) => _state.dispatch);
	
	const logout = async (event: SyntheticEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		fetch(`${config.server}/api/auth/logout`, { method: 'post' });
		auth({
			type: AuthAction.LOGOUT
		});
		upload_option_d({
			type: UploadOptionAction.SET,
			protected: false,
			hidden: true
		});
	};
	
	return(
		<Flex position='fixed' top='2rem' left='2rem' borderRadius='md' shadow='dark-lg'
			className={colorMode === 'dark' ? style.background : style.backgroundLight}>
			<Menu autoSelect={false}>
				<MenuButton as={IconButton} borderRightRadius='none' colorScheme="pink" icon={<FiMenu />}
					aria-label="Options" _focus={{ boxShadow: 'none' }} islazy='true'>
				Profile
				</MenuButton>
				<MenuList className={colorMode === 'dark' ? style.background : style.backgroundLight}>
					{/* <MenuGroup title="Profile"
						className={colorMode === 'dark' ? style.label : style.labelLight}>
						{(() => {
							if(_props.auth.loggedIn) {
								return (
									<>
										<MenuItem>
											<CLink as={Link} href={'/account'} >
												<a>
													<Text> My Account </Text>
												</a>
											</CLink>
										</MenuItem>
										<MenuItem>
											<CLink passHref as={Link} href='/' >
												<a onClick={logout}>
													<Text> Logout </Text>
												</a>
											</CLink>
										</MenuItem>
									</>
								);
							} else {
								return (
									<MenuItem>
										<CLink as={Link} href='/login'>
											<a>
												<Text> Login </Text>
											</a>
										</CLink>
									</MenuItem>
								);
							}
						})()}
					</MenuGroup> */}
					{(() => {
						if(_props.auth.loggedIn) {
							return (
								<>
									<MenuGroup title=""
										className={colorMode === 'dark' ? style.label : style.labelLight}>
										<MenuItem>
											<CLink passHref as={Link} href={'/dashboard'} >
												<a>
													<Text> Dashboard </Text>
												</a>
											</CLink>
										</MenuItem>
										<MenuItem>
											<CLink passHref as={Link} href={'/dashboard/files'} >
												<a>
													<Text> My Files </Text>
												</a>
											</CLink>
										</MenuItem>
									</MenuGroup>
									<MenuDivider />
								</>
							);
						}
					})()}
					<MenuGroup title="Help"
						className={colorMode === 'dark' ? style.label : style.labelLight}>
						<MenuItem about='Open android app' isDisabled> FAQ (soon) </MenuItem>
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
								<CLink as={Link} href='/account' >
									<a>
										<Text> { _props.auth.username } <Icon mx="1px" as={FiUser} /> </Text>
									</a>
								</CLink>
								<Spacer width="0.5rem" />
								<CLink as={Link} href='/' >
									<a onClick={logout}>
										<Text> Logout <Icon mx="1px" as={FiLogOut} /> </Text>
									</a>
								</CLink>
							</Flex>
						);
					} else {
						return (
							<Flex>
								<CLink as={Link} href='/register' >
									<a>
										<Text> Register <Icon mx="1px" as={FiUserPlus} /> </Text>
									</a>
								</CLink>
								<Spacer width="0.5rem" />
								<CLink as={Link} href='/login' >
									<a>
										<Text> Login <Icon mx="1px" as={FiLogIn} /> </Text>
									</a>
								</CLink>
							</Flex>
						);
					}
				})()}
				<Spacer width="0.5rem" />
			</Flex>
		</Flex>
	);
};