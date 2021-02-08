import { Flex, Spacer, Menu, MenuButton, MenuList, MenuGroup,
	ModalFooter, IconButton,
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
	MenuDivider, MenuItem, useDisclosure, Link} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { authenticationStore } from '../store/authentication.store'
import { LoginForm } from '../components/form/LoginForm'
import React, { SyntheticEvent } from 'react';
import { RegisterForm } from './form/RegisterForm';
import { AuthenticationAction, UploadOptionAction } from '../../enums';
import { logInRequest, registerRequest } from '../lib/authentication';
import { AccountInfo } from './info/AccountInfo';
import { uploadOptionStore } from '../store/uploadoption.store';

interface Props {
	authentication?: AuthenticationState;
};

export const MainMenu: React.FunctionComponent<Props> = (props) => {

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalMode, setModalMode] = React.useState("Login");
	const authDispatch = authenticationStore(state => state.dispatch);
	const optionsDispatch = uploadOptionStore(state => state.dispatch);
	
	const openRegister = () => {
		setModalMode("Register");
		onOpen();
	};

	const openLogin = () => {
		setModalMode("Login");
		onOpen()
	};

	const openAccount = () => {
		setModalMode("Account");
		onOpen()
	};

	const login = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const res = await logInRequest(event.target as HTMLFormElement);
		if(res) {
			optionsDispatch({
				...{ protected: true },
				type: UploadOptionAction.SET
			});

			authDispatch({
				...{...res.payload, key: res.authorization},
				type: AuthenticationAction.LOGIN
			});
			
			onClose();
		}
	};

	const logout = async (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();

		optionsDispatch({
			...{ protected: false },
			type: UploadOptionAction.SET
		});

		authDispatch({
			type: AuthenticationAction.LOGOUT
		});
	};

	const register = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const res = await registerRequest(event.target as HTMLFormElement);
		if(res) {
			optionsDispatch({
				...{ protected: true },
				type: UploadOptionAction.SET
			});
			authDispatch({
				...{...res.payload, key: res.authorization},
				type: AuthenticationAction.LOGOUT
			});
			onClose();
		}
	};

	return (
		<Flex position="fixed" zIndex={1} top="1rem" left="1rem">
			<Menu autoSelect={false}>
				<MenuButton as={IconButton} colorScheme="pink"
					aria-label="Options" _focus={{ boxShadow: "none" }}
					icon={<FiMenu />} />

				<MenuList>
					<MenuGroup title="Profile">
						{/* <MenuItem isDisabled> My Account </MenuItem> */}
						<MenuItem isDisabled> My Files (soon!) </MenuItem>
						{/* <MenuItem isDisabled> Billing </MenuItem> */}
						{(() => {
							if(props.authentication?.loggedIn) {
								return (
									<MenuItem onClick={logout}>
										Logout
									</MenuItem>
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
						<MenuItem isDisabled> Android App (soon)</MenuItem>
						<MenuItem isDisabled>
							API Documentation (soon)
						</MenuItem>
						<MenuItem isDisabled> FAQ </MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>

			<Spacer width="1rem" />

			{
				(()=>{ 
					if(props.authentication?.loggedIn) {
						return (
							<Flex alignItems="center" onClick={openAccount}>
								<Link> { props.authentication.username } </Link>
								<Spacer width="4" />
							</Flex>
						)
					} else {
						return (
						<> 
							<Flex alignItems="center" onClick={openRegister}>
								<Link>Register</Link>
							</Flex>

							<Spacer width="1rem" />

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
									return ( <LoginForm formAction={login} /> )
								} else if(modalMode == "Account") {
									return (
										<AccountInfo
											authentication={props.authentication} />
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