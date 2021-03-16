import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Stack, useColorMode } from '@chakra-ui/react';
import React, { SyntheticEvent, useState } from 'react';

import { validateEmail, validatePassword } from '../../lib/schema/validate';

import style from './FormBackground.module.css';

interface Props {
	formAction: (event: SyntheticEvent<HTMLFormElement>) => any;
}

export const LoginForm: React.FunctionComponent<Props> = (_props) => {
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
				<FormControl id="email" isInvalid={error.email}>
					<FormLabel>Email address</FormLabel>
					<Input type="email" placeholder='email' name='email' onChange={_validateEmail} required />
					<FormErrorMessage justifyContent='center'>
						{error.email}
					</FormErrorMessage>
				</FormControl>
				<FormControl id="password" isInvalid={error.password}>
					<FormLabel> Password </FormLabel>
					<InputGroup size="md">
						<Input type={show ? 'text' : 'password'} placeholder='password' name='password'
							onChange={_validatePassword} required/>
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
					Login
				</Button>
			</Stack>
		</form>
	);
};
