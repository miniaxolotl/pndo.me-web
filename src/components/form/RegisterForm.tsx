import { Stack, InputRightElement,
	Button, InputGroup,
	FormControl, Input } from '@chakra-ui/react'
import React, { SyntheticEvent } from 'react'

interface Props {
	formAction: (event: SyntheticEvent<HTMLFormElement>) => any
};

export const RegisterForm: React.FunctionComponent<Props> = (props) => {

	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)

	return (
		<form onSubmit={props.formAction}>
			<Stack>
				<FormControl isRequired>
					<Input size="md" placeholder="Email" variant="flushed"
						name="email"/>
				</FormControl>
				<FormControl isRequired>
					<Input size="md" placeholder="Username" variant="flushed"
						name="username"/>
				</FormControl>
				<FormControl isRequired>
					<InputGroup size="md">
						<Input pr="4.5rem" type={show ? "text" : "password"}
							placeholder="Password" variant="flushed"
							name="password"/>
						<InputRightElement width="4.5rem">
							<Button h="1.75rem" size="sm"
								_focus={{ boxShadow: "none" }}
								onClick={handleClick}>
							{show ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<Button type="submit" value="submit">
					Register
				</Button>
			</Stack>
		</form>
	)
}
