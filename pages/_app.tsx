import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { AnimatePresence } from 'framer-motion';

import { AppWrapper } from '../contexts/AppContext';
import theme from '../themes/default';

const App = ({ Component, pageProps }: AppProps) => {

	return (
		<AnimatePresence exitBeforeEnter>
			<ChakraProvider theme={theme} resetCSS>
				<AppWrapper>
					<Component {...pageProps} />
				</AppWrapper>
			</ChakraProvider>
		</AnimatePresence>
	)
};

export default App;