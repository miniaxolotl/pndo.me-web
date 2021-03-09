import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { StoreProvider } from '../lib/store/StoreProvider';
import { hydrateAllStore } from '../lib/store/store';
import theme from '../themes/default';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const store = hydrateAllStore(pageProps.state);
	return (
		<StoreProvider store={store}>
			<ChakraProvider resetCSS theme={theme}>
				<AnimatePresence>
					<Component {...pageProps} />
				</AnimatePresence>
			</ChakraProvider>
		</StoreProvider>
	);
};

export default MyApp;