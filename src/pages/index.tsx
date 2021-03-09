import { NextPage } from 'next';

import { DefaultLayout } from '../components/DefaultLayout';
import { createAllStore } from '../lib/store/store';

interface Props { }

const Index: NextPage<Props> = (_props) => {
	return(
		<DefaultLayout>
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
