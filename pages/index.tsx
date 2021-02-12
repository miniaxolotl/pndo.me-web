import { NextPage } from 'next';

import nookies from 'nookies';
import { useState } from 'react';
import { State } from 'zustand';

import { Layout } from '../components/Layout'
import { authStore } from '../store/auth';

interface Props {
	auth: AuthState & State;
	hostname: string;
};

const IndexPage: NextPage<Props> = (props) => {
	const [first, useFirst] = useState(false);
	if(!first) {
		authStore.setState(props.auth);
		!first ? useFirst(true) : void(null);
	}
	
	const state = {
		auth: {
			...authStore((state: AuthState) => (state)),
		},
	};
	
	return (
		<Layout {...state}>
		</Layout>
	);
};

IndexPage.getInitialProps = (ctx) => {
	const cookies = nookies.get(ctx);
	const props: any= {};

	const auth = cookies['auth'];

	props.auth = auth ? JSON.parse(auth) : null;

	return props;
};

export default IndexPage;
