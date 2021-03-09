import Link from 'next/link';
import { NextPage } from 'next';

import { Box, Link as CLink, Heading, Img } from '@chakra-ui/react';

import style from './Masthead.module.css';

interface Props {}

export const Masthead: NextPage<Props> = (_props: Props) => {
	return(
		<Box className={style.masthead}>
			<CLink as={Link} href='/' _hover={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.25)' }}>
				<a>
					<Heading as="h1" size='4xl' alignContent='center' justifyContent='center' className={style.heading}>
						pndo.me
						<Img src="/logo.svg" height='6rem' className={style.image} alt="pndo.me logo" />
					</Heading>
				</a>
			</CLink>
		</Box>
	);
};