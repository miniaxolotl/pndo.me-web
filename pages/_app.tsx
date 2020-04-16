// pages/_app.tsx
import withRedux, { MakeStore, ReduxWrapperAppProps } from 'next-redux-wrapper';
import App, { AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootState, reducer } from '../store/root.store';

import '../styles.scss'
import { AnimatePresence } from 'framer-motion';
import { parseCookies } from 'nookies';

/**
 * @param initialState The store's initial state (on the client side, the state of the server-side store is passed here)
 */
const makeStore: MakeStore = (initialState: rootState) => {
	return createStore(reducer, initialState);
};

class MyApp extends App<ReduxWrapperAppProps<RootState>> {
	static async getInitialProps({ Component, ctx }: AppContext) {

		const pageProps = Component.getInitialProps
			? await Component.getInitialProps(ctx) : {};

		try {

			const cookies = parseCookies(ctx);
			
			const rootState: RootState = ctx.store.getState();
			const initialProps: RootState = rootState;
			
			{ /* set cookies */
				initialProps.authorization = JSON.parse(cookies.authorization);
				initialProps.uploadOption = JSON.parse(cookies.uploadOption);
			}
		} catch(err) {
			// do nothing lol
		}
		
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