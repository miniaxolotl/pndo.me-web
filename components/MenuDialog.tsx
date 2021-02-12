import { Flex, Spacer, Menu, MenuButton, MenuList, MenuGroup,
	ModalFooter, IconButton,
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
	MenuDivider, MenuItem, useDisclosure, Link} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

import { authStore } from '../store/auth'

import { LoginForm } from './form/LoginForm'
import React, { SyntheticEvent } from 'react';
import { RegisterForm } from './form/RegisterForm';
import { UserDisplay } from './user/UserDisplay';
import { AuthAction } from '../types';
import { logInRequest, registerRequest } from '../lib/authentication';

interface Props {
	auth: AuthState;
};

export const MenuDialog: React.FunctionComponent<Props> = (props) => {

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalMode, setModalMode] = React.useState("Login");

	const dispatchAuth = authStore(state => state.dispatch);
	
	const openRegister = () => {
		setModalMode("Register");
		onOpen();
	};

	const openLogin = () => {
		setModalMode("Login");
		onOpen()
	};

	const openUser = () => {
		setModalMode("User");
		onOpen()
	};

	const logout = async (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();

		dispatchAuth({
			type: AuthAction.LOGOUT
		});
	};

	const login = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const res = await logInRequest(event.target as HTMLFormElement);

		if(!res.status) {
			const data = res.data;
			dispatchAuth({
				...{user: data.payload, key: data.authorization},
				type: AuthAction.LOGIN,
			});
			
			onClose();
		} else {
			return res;
		}
	};

	const register = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const res = await registerRequest(event.target as HTMLFormElement);
		
		if(!res.status) {
			const data = res.data;
			dispatchAuth({
				...{user: data.payload, key: data.authorization},
				type: AuthAction.LOGIN,
			});

			onClose();
		} else {
			return res;
		}
	};

	return (
		<Flex position="fixed" zIndex={1} top="2rem" left="2rem">

			<Menu autoSelect={false}>
				<MenuButton as={IconButton} colorScheme="pink" icon={<FiMenu />}
					aria-label="Menu hamburgur button"
					_focus={{ boxShadow: "none" }} />

				<MenuList>
					<MenuGroup title="Profile">
						{(() => {
							if(props.auth.loggedIn) {
								return (
									<>
										<MenuItem isDisabled>
											My Files
										</MenuItem>
										<MenuItem onClick={logout}>
											Logout
										</MenuItem>
									</>
								);
							} else {
								return (
									<MenuItem onClick={openLogin}>
										Login
									</MenuItem>
								);
							}
						})()}
					</MenuGroup>
					<MenuDivider />
					<MenuGroup title="Help">
						<MenuItem isDisabled>
							Android App (soon)
						</MenuItem>
						<MenuItem isDisabled>
							API Documentation (soon)
						</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>

			<Spacer width="2rem" />

			{
				(()=>{ 
					if(props.auth.loggedIn) {
						return (
							<Flex alignItems="center" onClick={openUser}>
								<Link>
									{ props.auth.user!.username }
								</Link>
							</Flex>
						)
					} else {
						return (
						<> 
							<Flex alignItems="center" onClick={openRegister}>
								<Link>Register</Link>
							</Flex>

							<Spacer />

							<Flex alignItems="center" onClick={openLogin}>
								<Link>Login</Link>
							</Flex>
						</>
						)
					} 
				})()
			}

			<Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader> {modalMode} </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{
							(()=>{ 
								if(modalMode == "Register") {
									return (
										<RegisterForm formAction={register} />
									)
								} else if (modalMode == "Login") {
									return (
										<LoginForm formAction={login} />
										);
								} else if(modalMode == "User") {
									return (
										<UserDisplay auth={props.auth} />
									)
								}
							})()
						}
					</ModalBody>

					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	)
};