import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo/lib/types';

import { DarkModeButton } from './DarkModeButton';
import { SeoHead } from './SeoHead';
import { Box, Container, Flex, useColorMode } from '@chakra-ui/react';

import { MainMenuButton } from './MainMenuButton';

import style from './DefaultLayout.module.css';

interface Props { 
	seo?: NextSeoProps;
	auth: AuthState;
}

export const DefaultLayout: NextPage<Props> = (_props: Props) => {
	const { colorMode } = useColorMode();

	return(
		<Flex minHeight="100vh" height="100%">
			<Flex position='fixed' minHeight="100vh" minWidth="100vw"
				className={colorMode === 'dark' ? style.background : style.backgroundLight} />
			<Container minHeight="100vh" height="100%" direction="column">
				<SeoHead seo={_props.seo} />
				<DarkModeButton />
				<MainMenuButton auth={_props.auth} />
				<Box {..._props} />
			</Container>
		</Flex>
	);
};