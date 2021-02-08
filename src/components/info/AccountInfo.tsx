import { Stack, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'

import { FiHexagon, FiUser, FiMail } from 'react-icons/fi'

interface Props {
	authentication?: AuthenticationState;
};

export const AccountInfo: React.FunctionComponent<Props> = (props) => {

	return (
		<Stack alignItems="center">
			{/* <Avatar /> */}
			<InputGroup>
				<InputLeftElement pointerEvents="none" 
      				children={<FiHexagon />}/>
				<Input size="md" value={props.authentication?.user_id!}
					variant="flushed" name="email" disabled/>
			</InputGroup>
			<InputGroup>
				<InputLeftElement pointerEvents="none"
      				children={<FiMail />}/>
				<Input size="md" value={props.authentication?.email!}
					variant="flushed" name="email" disabled/>
			</InputGroup>
			<InputGroup>
				<InputLeftElement pointerEvents="none" 
      				children={<FiUser />}/>
				<Input size="md" value={props.authentication?.username!}
					variant="flushed" name="email" disabled/>
			</InputGroup>
		</Stack>
	)
}
