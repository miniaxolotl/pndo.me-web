import { Box, Text, useColorMode } from '@chakra-ui/react';

import style from './FormBackground.module.css';

interface Props {
	message: string;
}

export const InfoCard: React.FunctionComponent<Props> = (_props) => {
	const { colorMode } = useColorMode();
	return (
		<Box spacing={4} shadow='dark-lg' borderRadius='xl'
			className={colorMode === 'dark' ? style.background : style.backgroundLight}>
			<Text> { _props.message } </Text>
		</Box>
	);
};
