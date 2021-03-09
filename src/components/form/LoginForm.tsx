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

	const handleClick = () => setShow(!show);

	const _validateEmail = (event) => {
		const value = event.target.value;
		userError({ ...error, email: validateEmail(value) });
	};

	const _validatePassword = (event) => {
		const value = event.target.value;
		userError({ ...error, password: validatePassword(value) });
	};

	return (
		<form onSubmit={_props.formAction}>
			<Stack spacing={4} shadow='dark-lg' borderRadius='xl'
				className={colorMode === 'dark' ? style.background : style.backgroundLight}>

				<FormControl id="email" isInvalid={error.email}>
					<FormLabel>Email address</FormLabel>
					<Input type="email" placeholder='email' name='email' onChange={_validateEmail} />
					<FormErrorMessage>
						{error.email}
					</FormErrorMessage>
				</FormControl>

				<FormControl id="password" isInvalid={error.password}>
					<FormLabel> Password </FormLabel>
					<InputGroup size="md">
						<Input type={show ? 'text' : 'password'} placeholder='password' name='password'
							onChange={_validatePassword} />
						<InputRightElement width="4.5rem">
							<Button h="60%" size="sm" onClick={handleClick}>
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
						<FormErrorMessage>
							{error.password}
						</FormErrorMessage>
					</InputGroup>
				</FormControl>

				<Button mt={4} width='100%' type="submit">
					Submit
				</Button>
				
			</Stack>
		</form>
	);
};
