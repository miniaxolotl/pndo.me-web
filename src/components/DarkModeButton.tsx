import { MoonIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

export const DarkModeButton = (): JSX.Element => {
	const { toggleColorMode } = useColorMode();

	return (
		<IconButton
			aria-label="Search database"
			position="fixed"
			top="1rem"
			right="1rem"
			variant="ghost"
			_focus={{
				boxShadow: 'none'
			}}
			icon={<MoonIcon />}
			onClick={toggleColorMode}
		/>
	);
};
