import { NextPage } from 'next'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { MainMenu } from '../components/MainMenu'

import { Text, Icon, Box } from '@chakra-ui/react'

import { FiHeart } from 'react-icons/fi'

interface Props {
	authentication?: AuthenticationState;
};

export const Layout: NextPage<Props> = (props) => {

	return(
		<Container minHeight="100vh" height="100%" direction="column">
			
			<MainMenu authentication={props.authentication} />
			<DarkModeSwitch />

			<Box {...props} />
			
			<Footer>
				<Text>With <Icon as={FiHeart}/> from Elias</Text>
			</Footer>
		</Container>
	)
};