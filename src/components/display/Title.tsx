import { NextPage } from 'next';

import { Box, Heading } from '@chakra-ui/react';

import style from './Title.module.css';

interface Props {
	heading: string;
}

export const Title: NextPage<Props> = (_props: Props) => {
	return(
		<Box className={style.title}>
			<Heading as="h1" size='xl' alignContent='center' justifyContent='center' className={style.heading}>
				{_props.heading}
			</Heading>
		</Box>
	);
};