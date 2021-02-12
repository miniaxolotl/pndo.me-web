import { NextPage } from 'next'

import { Box } from '@chakra-ui/react'

import { Container } from './Container'
import { ColorSwitch } from './ColorSwitch';
import { MenuDialog } from './MenuDialog';

interface Props {
	auth: AuthState;
};

export const Layout: NextPage<Props> = (props) => {

	return(
		<Container minHeight="100vh" height="100%" direction="column">
			
			<MenuDialog auth={props.auth} />
			<ColorSwitch />

			<Box {...props} />
			
			{/* <Footer>
				<Text>With <Icon as={FiHeart}/> from Elias</Text>
			</Footer> */}
		</Container>
	)
};