// pages/_app.tsx
import withRedux, { MakeStore, ReduxWrapperAppProps } from 'next-redux-wrapper';
import App, { AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootState, reducer } from '../store/root.store';

import '../styles.scss'
import { AnimatePresence } from 'framer-motion';

/**
 * @param initialState The store's initial state (on the client side, the state of the server-side store is passed here)
 */
const makeStore: MakeStore = (initialState: rootState) => {
	return createStore(reducer, initialState);
};

class MyApp extends App<ReduxWrapperAppProps<RootState>> {
	static async getInitialProps({ Component, ctx }: AppContext) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

		return { pageProps };
	}

	render() {
		const { Component, pageProps, store, router  } = this.props;
		return (
		<Provider store={store}>
			<AnimatePresence exitBeforeEnter>
				<Component {...pageProps} key={router.route} />
      		</AnimatePresence>
		</Provider>
		);
	}
}

export default withRedux(makeStore)(MyApp);