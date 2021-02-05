import { Flex, Heading } from '@chakra-ui/react'

export const Hero = (props: { title: string}) => (
  <Flex justifyContent="center" alignItems="center" direction="column"
  	pb="2.5vh" pt="1vh">
    <Heading fontSize="6xl">{props.title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'title',
}
