import { FiFolder } from 'react-icons/fi';
import Link from 'next/link';
import { NextPage } from 'next';
import { Link as CLink, Flex, Heading, Icon, Text } from '@chakra-ui/react';

interface Props {
	album_id: string;
	album_title: string;
	filename: string;
}

export const ImageTitle: NextPage<Props> = (_props: Props) => {
	return(
		<Flex>
			<Flex direction='row' gridGap={1} textOverflow='ellipsis' overflow='hidden' width='100%'>
				<Heading as="h1" size='lg'>
					<CLink passHref as={Link} href={`/album/${_props.album_id}`} >
						<Flex  _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
							<Icon as={FiFolder}/>
							<Text> {_props.album_title} </Text>
						</Flex>
					</CLink>
				</Heading>
				<Heading as="h1" size='lg'>
					<Text> / </Text>
				</Heading>
				<Heading as="h1" size='lg' justifyContent='flex-start' 
					textOverflow='ellipsis' overflow='hidden'>
					<Text whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
						{_props.filename}
					</Text>
				</Heading>
			</Flex>
		</Flex>
	);
};