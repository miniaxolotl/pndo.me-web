import { NextPage } from 'next';

import { Box, Heading } from '@chakra-ui/react';

interface Props {
	heading: string;
}

export const Title: NextPage<Props> = (_props: Props) => {
	return(
		<Box>
			<Heading as="h1" size='xl' alignContent='center' justifyContent='center'>
				{_props.heading}
			</Heading>
		</Box>
	);
};