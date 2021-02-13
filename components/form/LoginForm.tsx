import { Stack, InputRightElement,
	Button, InputGroup,
	FormControl, Input, Text } from '@chakra-ui/react'
import { SyntheticEvent } from 'react'
import { useState } from 'react'

interface Props {
	formAction: (event: SyntheticEvent<HTMLFormElement>) => any
};

export const LoginForm: React.FunctionComponent<Props> = (props) => {

	const [show, setShow] = useState(false);
	const [error, setError] = useState("")
	const handleClick = () => setShow(!show)

	const send = async (event: SyntheticEvent<HTMLFormElement>) => {
		const res = await props.formAction(event);
		console.log(res);
		
		if(res && res.status == 400) {
			// setError(JSON.parse(res.data));
			setError(res.data);
		}
	};


	return (
		<form onSubmit={send}>
			<Stack>
				<FormControl isRequired>
					<Input size="md" placeholder="Email"
						variant="flushed" name="email"/>
				</FormControl>
				<FormControl isRequired>
					<InputGroup size="md">
						<Input pr="4.5rem" type={show ? "text" : "password"}
							placeholder="Password" variant="flushed" name="password"/>
						<InputRightElement width="4.5rem">
							<Button h="1.75rem" size="sm" onClick={handleClick}
								_focus={{ boxShadow: "none" }}>
							{show ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
					<Text color="red.400">
						{ error ? "invalid email or password" : null}
					</Text>
				</FormControl>
				<Button type="submit" value="submit" >
					Login
				</Button>
			</Stack>
		</form>
	)
}
