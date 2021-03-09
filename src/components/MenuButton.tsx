import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo/lib/types';

import { Container } from '@chakra-ui/react';

interface Props { 
	seo?: NextSeoProps;
}

export const DefaultLayout: NextPage<Props> = (_props: Props) => {
	return(
		<Container>
		</Container>
	);
};