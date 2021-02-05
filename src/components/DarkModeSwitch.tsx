import { useColorMode, IconButton } from '@chakra-ui/react'
import { MoonIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { toggleColorMode } = useColorMode()
//   const isDark = colorMode === 'dark'

  return (

	<IconButton
		aria-label="Search database"
		position="fixed"
		top="1rem"
		right="1rem"
		variant="ghost"
		_focus={{
			boxShadow: "none",
		}}
		icon={<MoonIcon />}
		onClick={toggleColorMode}
	/>

    // <Switch
    //   position="fixed"
    //   top="1rem"
    //   right="1rem"
	//   color="green"
	//   size="lg"
    //   isChecked={isDark}
	//   onChange={toggleColorMode}
	//   />
  )
}
