import Link from 'next/link';
import { NextPage } from 'next';

import { Box, Link as CLink, Flex, Heading, Img, Text } from '@chakra-ui/react';

import style from './Masthead.module.css';

interface Props {
	heading: string;
	subheading?: string;
	image?: string;
	disableImage?: boolean;
	href?: string;
}

export const Masthead: NextPage<Props> = (_props: Props) => {
	return(
		<Box className={style.masthead}>
			<Flex justifyContent='center' alignItems='center'>
				<CLink as={Link} href={_props.href ? _props.href : '/'} >
					<Flex as='a' direction='row'>
						{(() => {
							if(_props.disableImage) {
								return (null);
							} else {
								return (
									<Img src='/logo.svg' height='5rem' className={style.image} display='inline'
										alt={`${_props.heading} pndo.me logo`} />
								);
							}
						})()}
						<Heading as="h1" size='2xl' alignContent='center' justifyContent='center' alignSelf='center'
							className={style.heading}>
							{_props.heading}
						</Heading>
					</Flex>
				</CLink>
			</Flex>
			<Text _hover={{ cursor: 'default' }}>
				{_props.subheading}
			</Text>
		</Box>
	);
};