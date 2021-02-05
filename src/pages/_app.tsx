import { AnimatePresence } from 'framer-motion';

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../themes/theme'

import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AnimatePresence exitBeforeEnter>
			<ChakraProvider resetCSS theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</AnimatePresence>
	)
}

export default MyApp
