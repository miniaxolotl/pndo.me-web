import Link from 'next/link';
import { NextPage } from 'next';

import { Box, Link as CLink, Heading, Img } from '@chakra-ui/react';

import style from './Masthead.module.css';
import { useRouter } from 'next/dist/client/router';

interface Props {
	site_name: string;
}

export const Masthead: NextPage<Props> = (_props: Props) => {
	const router = useRouter();

	const home = (_event) => {
		_event.preventDefault();
		_event.stopPropagation();

		if(router.pathname.length > 1)
			router.push('/', undefined);
	};

	return(
		<Box className={style.masthead}>
			<CLink as={Link} href='/'
				_hover={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.25)' }}>
				<a onClick={home}>
					<Heading as="h1" size='4xl' alignContent='center' justifyContent='center' className={style.heading}>
						{_props.site_name}
						<Img src="/logo.svg" height='6rem' className={style.image} alt="pndo.me logo" />
					</Heading>
				</a>
			</CLink>
		</Box>
	);
};