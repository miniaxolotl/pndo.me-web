import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo/lib/types';

import { DarkModeButton } from './DarkModeButton';
import { SeoHead } from './SeoHead';
import { Box, Container } from '@chakra-ui/react';

interface Props { 
	seo?: NextSeoProps;
}

export const DefaultLayout: NextPage<Props> = (_props: Props) => {
	return(
		<Container minHeight="100vh" height="100%" direction="column">
			<SeoHead />
			<DarkModeButton />
			<Box {..._props} />
		</Container>
	);
};