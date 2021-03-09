import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';

import { DefaultLayout } from '../components/DefaultLayout';
import { Masthead } from '../components/Masthead';
import { createAllStore, useAuth } from '../lib/store/store';

interface Props { }

const Index: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);

	return(
		<DefaultLayout auth={auth} >
			<Box align='center' >
				<Masthead />
			</Box>
		</DefaultLayout>
	);
};

export const getServerSideProps = async (_context: any) => {
	const store = createAllStore();
	return {
		props: { 
			state: {
				upload_option: JSON.stringify(store.upload_option.getState()),
				auth: JSON.stringify(store.auth.getState())
			}
		}
	};
};

  
export default Index;
