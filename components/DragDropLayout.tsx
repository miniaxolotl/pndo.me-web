import { NextPage } from 'next'

import { Box, Icon, Modal, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'

import { Container } from './Container'
import { ColorSwitch } from './ColorSwitch';
import { MenuDialog } from './MenuDialog';
import { Footer } from './Footer';
import { FiHeart } from 'react-icons/fi';
import { dragIn, dragOut, drop } from '../lib/dragdrop';
import React from 'react';

interface Props {
	auth: AuthState;
};

export const DragDropLayout: NextPage<Props> = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const dragInF = (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
		dragIn(event);
		onOpen();
	};

	const dragOutF = (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
		dragOut(event);
		onClose();
	};

	const dropF = (event: React.DragEvent<HTMLDivElement>) => {
		drop(event);
		onClose();

		var input = document.getElementsByName('file')[0] as HTMLInputElement;

		input.files = event.dataTransfer.files;
		input.dispatchEvent(new InputEvent("change", event as any));
		
	};

	return(
		<Container minHeight="100vh" height="100%" direction="column" overflowX="hidden" onDragEnter={dragInF} onDragOver={dragInF}
			paddingBottom="4rem">

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay onDragEnter={dragInF} onDragOver={dragInF}
					onDragLeave={dragOutF} onDrop={dropF} />
			</Modal>
			
			<MenuDialog auth={props.auth} />
			<ColorSwitch />

			<Box {...props} />
			
			<Footer position="absolute" height="2rem" bottom="2rem">
				<Text>With <Icon as={FiHeart}/> from Elias</Text>
			</Footer>
		</Container>
	)
};