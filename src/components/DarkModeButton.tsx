import { MoonIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

import style from './MainMenuButton.module.css';

export const DarkModeButton = (): JSX.Element => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			icon={<MoonIcon />}
			onClick={toggleColorMode}
			className={colorMode === 'dark' ? style.background : style.backgroundLight}
			shadow='dark-lg'
			aria-label="Search database"
			position="fixed"
			top="2rem"
			right="2rem"
			_focus={{
				boxShadow: 'none'
			}}
		/>
	);
};
