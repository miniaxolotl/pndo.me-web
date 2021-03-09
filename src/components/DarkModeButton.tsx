import { MoonIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

import style from './MainMenuButton.module.css';

export const DarkModeButton = (): JSX.Element => {
	const { colorMode, toggleColorMode } = useColorMode();
	const color = colorMode === 'dark' ? '#16161D' : '#fff';
	return (
		<IconButton
			icon={<MoonIcon />}
			onClick={toggleColorMode}
			className={colorMode === 'dark' ? style.background : style.backgroundLight}
			background={color}
			shadow='dark-lg'
			aria-label="Search database"
			position="fixed"
			top="2rem"
			right="2rem"
			_hover={{
			}}
			_active={{
			}}
			_focus={{
				border: 'none',
				bg: color
			}}
		/>
	);
};
