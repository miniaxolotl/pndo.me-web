import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';

import { StoreProvider } from '../lib/store/StoreProvider';
import { hydrateAllStore } from '../lib/store/store';

import fonts from '../styles/font-face';
import theme from '../styles/default';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const store = hydrateAllStore(pageProps.state);
	return (
		<ChakraProvider resetCSS theme={theme}>
			<StoreProvider store={store}>
				<Global styles={fonts} />
				<AnimatePresence>
					<Component {...pageProps} />
				</AnimatePresence>
			</StoreProvider>
		</ChakraProvider>
	);
};

export default MyApp;