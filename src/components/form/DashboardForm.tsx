import { Button, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement,
	InputRightElement, Stack, useColorMode } from '@chakra-ui/react';
import { FiHexagon, FiLock, FiMail, FiUser } from 'react-icons/fi';
import React, { SyntheticEvent, useState } from 'react';

import { validateEmail, validatePassword } from '../../lib/schema/validate';

import style from './FormBackground.module.css';

interface Props {
	formAction: (event: SyntheticEvent<HTMLFormElement>) => any;
	auth: AuthState;
}

export const DashboardForm: React.FunctionComponent<Props> = (_props) => {
	const { colorMode } = useColorMode();
	const [ show, setShow ] = React.useState(false);
	const [ error, userError ] = useState({
		email: null,
		username: null,
		password: null
	});

	const hideToggle = () => setShow(!show);

	const _validateEmail = (_event) => {
		const value = _event.target.value;
		userError({ ...error, email: validateEmail(value) });
	};

	const _validatePassword = (_event) => {
		const value = _event.target.value;
		userError({ ...error, password: validatePassword(value) });
	};

	const _submit = (_event) => {
		_event.preventDefault();
		_event.stopPropagation();
		const email = _event.target.email.value;
		const password = _event.target.password.value;

		if(validateEmail(_event.target.email.value || _event.target.password.value)) {
			userError({
				...error,
				email: validateEmail(email),
				password: validatePassword(password)
			});
		} else {
			_props.formAction(_event);
		}
	};
	return (
		<form onSubmit={_submit}>
			<Stack spacing={4} shadow='dark-lg' borderRadius='xl'
				className={colorMode === 'dark' ? style.background : style.backgroundLight}>
				<InputGroup>
					<InputLeftElement pointerEvents="none">
						<FiHexagon />
					</InputLeftElement>
					<Input size="md" value={_props.auth.user_id} variant="flushed" name="user_id" disabled/>
				</InputGroup>
				<InputGroup>
					<InputLeftElement pointerEvents="none">
						<FiUser />
					</InputLeftElement>
					<Input size="md" value={_props.auth.username} variant="flushed" name="username" disabled/>
				</InputGroup>
				<FormControl id="email" isInvalid={error.email}>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<FiMail />
						</InputLeftElement>
						<Input size="md" placeholder={_props.auth.email} variant="filled" name="email"
							onChange={_validateEmail}/>
					</InputGroup>
					<FormErrorMessage justifyContent='center'>
						{error.email}
					</FormErrorMessage>
				</FormControl>
				<FormControl id="password" isInvalid={error.password}>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<FiLock />
						</InputLeftElement>
						<Input size="md" type={show ? 'text' : 'password'} placeholder='password' variant='filled' name="password" onChange={_validatePassword}/>
						<InputRightElement width="4.5rem">
							<Button h="60%" size="sm" onClick={hideToggle}>
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage justifyContent='center'>
						{error.password}
					</FormErrorMessage>
				</FormControl>
				<Button mt={4} width='100%' type="submit">
					Submit
				</Button>
			</Stack>
		</form>
	);
};
