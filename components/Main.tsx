import { Flex, StackProps } from '@chakra-ui/react'

export const Main = (props: StackProps) =>{
	return (
		<Flex direction="column" width="90vw"
			justifyContent="center" alignItems="center" {...props} />
	);
};
