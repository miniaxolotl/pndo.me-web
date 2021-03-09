import { NextPage } from 'next';

import { DefaultLayout } from '../components/DefaultLayout';
import { createAllStore, useAuth } from '../lib/store/store';

interface Props { }

const Index: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);

	return(
		<DefaultLayout auth={auth}>
		</DefaultLayout>
	);
};

export const getServerSideProps = async (_context: any) => {
	const store = createAllStore();
	return {
		props: { 
			state: {
				count: JSON.stringify(store.upload_option.getState()),
				auth: JSON.stringify(store.auth.getState())
			}
		}
	};
};

  
export default Index;
