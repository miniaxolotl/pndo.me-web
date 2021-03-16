import { NextSeoProps } from 'next-seo/lib/types';

import { DarkModeButton } from './global/DarkModeButton';
import { SeoHead } from './global/SeoHead';
import { Box, Container, Flex, Icon, Link, Text, useColorMode } from '@chakra-ui/react';
import { FiExternalLink, FiHeart } from 'react-icons/fi';

import { Footer } from './global/Footer';
import { MainMenuButton } from './global/MainMenuButton';

import { config } from '../res/config';
import style from './DefaultLayout.module.css';

interface Props { 
	seo?: NextSeoProps;
	auth: AuthState;
}

export const DefaultLayout: React.FunctionComponent<Props> = (_props: Props) => {
	const { colorMode } = useColorMode();
	const colorClass = colorMode === 'dark' ? style.background : style.backgroundLight;
	const footerLink = colorMode === 'dark' ? config.theme.dark.source : config.theme.light.source;
	const backgroundImage = colorMode === 'dark' ? `url(${config.theme.dark.url})` : `url(${config.theme.light.url})`;
	return(
		<Flex minHeight="100vh" height="100%" id='_main'>
			<Flex className={colorClass} backgroundImage={backgroundImage} />
			<Container minHeight="100vh" maxW="container.lg" direction="column" className={style.container}>
				<SeoHead seo={_props.seo} />
				<DarkModeButton />
				<MainMenuButton auth={_props.auth} />
				<Box {..._props} />
			</Container>
			<Footer direction='column' justify='center' align='center' fontSize='small'>
				<Link href={footerLink}> art source <Icon mx="1px" as={FiExternalLink} /> </Link>
				<Text> With <Icon as={FiHeart} /> from Elias </Text>
			</Footer>
		</Flex>
	);
};