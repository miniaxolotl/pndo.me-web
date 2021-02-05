import { Container } from '../components/Container'
import { Hero } from '../components/Hero'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { UploadTool } from '../components/UploadTool'
import { Footer } from '../components/Footer'
import { Main } from '../components/Main'
import { FileList } from '../components/FileList'

import { Box, Flex, Text, Icon, Spacer } from '@chakra-ui/react'

import { MainMenu } from '../components/MainMenu'
import { NextPage } from 'next'

import { FiHeart } from 'react-icons/fi'

import example_file from '../public/example_file.json'

const Index: NextPage<any> = () => {
	return(
		<Container minHeight="100vh" height="100%" direction="column" >
			<DarkModeSwitch />
			<MainMenu />

			<Container direction="column" width="90vw" minHeight="50vh"
				justifyContent="flex-end" alignItems="center">
				<Hero title="pandome"  />
				<UploadTool title="drag and drop to upload..." />
			</Container>

			<Main direction="column" width="90vw"
				justifyContent="center" alignItems="center">

				<FileList files={example_file} />
			</Main>
			
			<Footer>
				<Text>With <Icon as={FiHeart}/> from Elias</Text>
			</Footer>
		</Container>
	)
};

export default Index
