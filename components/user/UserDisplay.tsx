import { Stack, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'

import { FiHexagon, FiUser, FiMail } from 'react-icons/fi'

interface Props {
	auth: AuthState;
};

export const UserDisplay: React.FunctionComponent<Props> = (props) => {

	return (
		<Stack alignItems="center">
			<InputGroup>
				<InputLeftElement pointerEvents="none" 
      				children={<FiHexagon />}/>
				<Input size="md" value={props.auth.user!.user_id!}
					variant="flushed" name="email" disabled/>
			</InputGroup>
			<InputGroup>
				<InputLeftElement pointerEvents="none"
      				children={<FiMail />}/>
				<Input size="md" value={props.auth.user!.email!}
					variant="flushed" name="email" disabled/>
			</InputGroup>
			<InputGroup>
				<InputLeftElement pointerEvents="none" 
      				children={<FiUser />}/>
				<Input size="md" value={props.auth.user!.username}
					variant="flushed" name="email" disabled/>
			</InputGroup>
		</Stack>
	)
}
