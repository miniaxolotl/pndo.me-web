import Link from 'next/link';
import { NextPage } from 'next';

import { Box, Link as CLink, Heading, Img } from '@chakra-ui/react';

import style from './Masthead.module.css';

interface Props {
	heading: string;
	image?: string;
	disableImage?: boolean;
	href?: string;
}

export const Masthead: NextPage<Props> = (_props: Props) => {
	return(
		<Box className={style.masthead}>
			<CLink as={Link} href={_props.href ? _props.href : '/'}
				_hover={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.25)' }}>
				<a>
					<Heading as="h1" size='2xl' alignContent='center' justifyContent='center' className={style.heading}>
						{(() => {
							if(_props.disableImage) {
								return (null);
							} else {
								return (
									<Img src="/logo.svg" height='5rem' className={style.image} display='inline'
										alt={`${_props.heading} pndo.me logo`} />
								);
							}
						})()}
						{_props.heading}
					</Heading>
				</a>
			</CLink>
		</Box>
	);
};