// pages/_app.tsx
import withRedux, { MakeStore, ReduxWrapperAppProps } from 'next-redux-wrapper';
import App, { AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootState, reducer } from '../store/root.store';

import '../styles.scss'
import { AnimatePresence } from 'framer-motion';
import { parseCookies } from 'nookies';
import { RootAction, ActionGroup, UploadHistoryAction } from '../store/_store.types';

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

		const cookies = parseCookies(ctx);

		const rootState: RootState = ctx.store.getState();
		const initialProps: RootState = rootState;

		const uploadHistory = cookies.uploadHistory;
		if(uploadHistory) {
			initialProps.uploadOption = JSON.parse(uploadHistory);
		}

		const cleanupAction: RootAction = {
			group: ActionGroup.UPLOAD_HISTORY,
			action: UploadHistoryAction.CLEANUP
		};
		ctx.store.dispatch({ type: cleanupAction });

		const uploadOption = cookies.uploadOption;
		if(uploadOption) {
			initialProps.uploadOption = JSON.parse(uploadOption);
		}

		const authorization = cookies.authorization;
		if(authorization) {
			initialProps.authorization = JSON.parse(authorization);
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