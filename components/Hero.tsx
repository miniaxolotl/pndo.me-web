import { Flex, Heading, Link, Text } from '@chakra-ui/react'

export const Hero
	= (props: { title: string, subtitle: string, hostname: string}) => (

  	<Flex justifyContent="center" alignItems="center" direction="column"
	  pb="4vh" >

		<Link href={`/`} textAlign="center">
			<Heading fontSize="6xl" >{ props.title }</Heading>
		</Link>
			<Text fontSize="sm">{ props.subtitle } </Text>
  	</Flex>
)

Hero.defaultProps = {
  title: 'title',
  subtitle: "",
};
