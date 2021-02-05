import { Button, Flex, Spacer, Menu, MenuButton, MenuList, MenuGroup, MenuDivider, MenuItem} from '@chakra-ui/react'

export const MainMenu = () => {

return (
	<Flex 
	position="fixed"
	zIndex={1}
	top="1rem"
	left="1rem">
		<Menu>
			<MenuButton as={Button}
			_focus={{
				boxShadow: "none",
			}}
			colorScheme="pink">
				Profile
			</MenuButton>
			<MenuList>
				<MenuGroup title="Profile">
				<MenuItem> My Account </MenuItem>
				<MenuItem> My Files </MenuItem>
				<MenuItem> Billing </MenuItem>
				</MenuGroup>
				<MenuDivider />
				<MenuGroup title="Help">
				<MenuItem> Android App</MenuItem>
				<MenuItem> API Documentation</MenuItem>
				<MenuItem> FAQ</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>

		<Spacer width="1rem" />

		<Flex alignItems="center"> Login </Flex>
	</Flex>

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
