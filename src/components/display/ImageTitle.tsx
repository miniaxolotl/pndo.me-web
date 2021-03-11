import { FiFolder } from 'react-icons/fi';
import Link from 'next/link';
import { NextPage } from 'next';
import { Link as CLink, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import style from './Title.module.css';

interface Props {
	album_id: string;
	filename: string;
}

export const ImageTitle: NextPage<Props> = (_props: Props) => {
	return(
		<Flex className={style.title} alignContent='center' justifyContent='center'>
			<Flex direction='row' gridGap={1} textOverflow='ellipsis' overflow='hidden' width='100%'
				alignContent='center' justifyContent='center'>
				<Heading as="h1" size='lg'  className={style.heading}>
					<CLink passHref as={Link} href={`/album/${_props.album_id}`} >
						<Flex  _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
							<Icon as={FiFolder}/>
							<Text> {_props.album_id} </Text>
						</Flex>
					</CLink>
				</Heading>

				<Heading as="h1" size='lg' className={style.heading}>
					<Text> / </Text>
				</Heading>
				
				<Heading as="h1" size='lg' className={style.heading} justifyContent='flex-start' 
					textOverflow='ellipsis' overflow='hidden'>
					<Text whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
						{_props.filename}
					</Text>
				</Heading>
			</Flex>
		</Flex>
	);
};