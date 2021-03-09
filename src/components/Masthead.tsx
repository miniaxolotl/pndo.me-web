import { NextPage } from 'next';

import { Box, Heading, Img } from '@chakra-ui/react';

import style from './Masthead.module.css';

interface Props {}

export const Masthead: NextPage<Props> = (_props: Props) => {
	return(
		<Box className={style.masthead}>
			<Heading as="h1" size='4xl' alignContent='center' justifyContent='center' className={style.heading}>
				pndo.me
				<Img src="/logo.svg" height='6rem' className={style.image} />
			</Heading>
		</Box>
	);
};