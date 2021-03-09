import { Flex, FlexProps, useColorMode } from '@chakra-ui/react';

import style from './Footer.module.css';

export const Footer = (props: FlexProps) => {
	const { colorMode } = useColorMode();
	return (
		<Flex as="footer" {...props} position='absolute'
			left='25%' bottom='2rem' width='50%' justify='center' borderRadius='md'
			className={colorMode === 'dark' ? style.background : style.backgroundLight} />
	);
};