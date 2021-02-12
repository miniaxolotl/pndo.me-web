import { useColorMode, IconButton } from '@chakra-ui/react'
import { MoonIcon } from '@chakra-ui/icons'

export const ColorSwitch = () => {
  const { toggleColorMode } = useColorMode();

  return (
	<IconButton
		aria-label="Darkmode switch"
		position="fixed" top="2rem" right="2rem"
		icon={<MoonIcon />} variant="ghost"
		_focus={{
			boxShadow: "none",
		}}
		onClick={toggleColorMode} />
  );
};