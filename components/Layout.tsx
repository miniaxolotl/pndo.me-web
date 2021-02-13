import { NextPage } from 'next'
import { NextSeo, NextSeoProps } from 'next-seo';

import { Box, Icon, Text } from '@chakra-ui/react'

import { Container } from './Container'
import { ColorSwitch } from './ColorSwitch';
import { MenuDialog } from './MenuDialog';
import { Footer } from './Footer';
import { FiHeart } from 'react-icons/fi';

interface Props {
	auth: AuthState;
	seo: NextSeoProps;
};

export const Layout: NextPage<Props> = (props) => {
	const seo = props.seo;

	return(
		<Container minHeight="100vh" height="100%" direction="column" overflowX="hidden"
			paddingBottom="4rem">
		
			<NextSeo
				title={seo.title}
				description={seo.description}
				openGraph={seo.openGraph}
				twitter={seo.twitter} />

			<MenuDialog auth={props.auth} />
			<ColorSwitch />

			<Box {...props} />
			
			<Footer position="absolute" height="2rem" bottom="2rem">
				<Text>With <Icon as={FiHeart}/> from Elias</Text>
			</Footer>
		</Container>
	)
};