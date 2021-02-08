import { Flex, Heading, Link } from '@chakra-ui/react'

export const Hero = (props: { title: string, hostname: string}) => (
  	<Flex justifyContent="center" alignItems="center" direction="column"
		pb="2.5vh" pt="1vh">

		<Link href={`http://${props.hostname}/`}>
			<Heading fontSize="6xl">{ props.title }</Heading>
		</Link>
  	</Flex>
)

Hero.defaultProps = {
  title: 'title',
}
