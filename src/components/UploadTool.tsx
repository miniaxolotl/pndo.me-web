import { Flex, Tooltip, IconButton, Spacer } from '@chakra-ui/react'
import { FiLock, FiUpload, FiEyeOff } from 'react-icons/fi'

export const UploadTool= () => (
  <Flex direction="row" >
    {/* <Heading fontSize="sm">{props.title}</Heading> */}
	<Tooltip label="Upload file" >
		<IconButton
			borderRadius="100%"
			colorScheme="green"
			aria-label="Upload file"
			_focus={{
				boxShadow: "none",
			}}
			icon={<FiUpload height={8} />}
		/>
	</Tooltip>

	<Spacer width="4rem" />

	<Tooltip label="Protected file toggle">
		<IconButton
			borderRadius="100%"
			aria-label="Protected file toggle"
			_focus={{
				boxShadow: "none",
			}}
			icon={<FiLock height={8} />}
		/>
	</Tooltip>

	<Spacer />

	<Tooltip label="Hide file toggle">
		<IconButton
			borderRadius="100%"
			aria-label="Hide file toggle"
			_focus={{
				boxShadow: "none",
			}}
			icon={<FiEyeOff height={8} />}
		/>
	</Tooltip>
  </Flex>
)

UploadTool.defaultProps = {
  title: 'title',
}
