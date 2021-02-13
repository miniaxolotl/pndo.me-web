import { NextPage } from 'next'

import { Box, Icon, Text } from '@chakra-ui/react'

import { Container } from './Container'
import { ColorSwitch } from './ColorSwitch';
import { MenuDialog } from './MenuDialog';
import { Footer } from './Footer';
import { FiHeart } from 'react-icons/fi';

interface Props {
	auth: AuthState;
};

export const Layout: NextPage<Props> = (props) => {

	return(
		<Container minHeight="100vh" height="100%" direction="column"
			paddingBottom="4rem">
			
			<MenuDialog auth={props.auth} />
			<ColorSwitch />

			<Box {...props} />
			
			<Footer position="absolute" height="2rem" bottom="2rem">
				<Text>With <Icon as={FiHeart}/> from Elias</Text>
			</Footer>
		</Container>
	)
};