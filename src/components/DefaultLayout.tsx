import { NextSeoProps } from 'next-seo/lib/types';

import { DarkModeButton } from './global/DarkModeButton';
import { SeoHead } from './global/SeoHead';
import { Box, Container, Flex, Icon, Link, Text, useColorMode } from '@chakra-ui/react';
import { FiExternalLink, FiHeart } from 'react-icons/fi';

import { Footer } from './global/Footer';
import { MainMenuButton } from './global/MainMenuButton';

import style from './DefaultLayout.module.css';

interface Props { 
	seo?: NextSeoProps;
	auth: AuthState;
}

export const DefaultLayout: React.FunctionComponent<Props> = (_props: Props) => {
	const { colorMode } = useColorMode();
	const footerLink = colorMode === 'dark'
		? 'https://erisiar.tumblr.com/post/179748400117' : 'https://erisiar.tumblr.com/post/612048966948945920/x';
	return(
		<Flex minHeight="100vh" height="100%" id='_main'>
			<Flex position='fixed' minHeight="100vh" minWidth="100vw" width="100%" height="100%"
				className={colorMode === 'dark' ? style.background : style.backgroundLight} />
			<Container minHeight="100vh" height="100%" maxW="container.lg" direction="column" justify='center' className={style.container}>
				<Box {..._props} />
				<SeoHead seo={_props.seo} />
				<DarkModeButton />
				<MainMenuButton auth={_props.auth} />
				<Footer direction='column' justify='center' align='center' fontSize='small'>
					<Link href={footerLink}> art source <Icon mx="1px" as={FiExternalLink} /> </Link>
					<Text> With <Icon as={FiHeart}/> from Elias </Text>
				</Footer>
			</Container>
		</Flex>
	);
};