import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';

import { DefaultLayout } from '../components/DefaultLayout';
import { Masthead } from '../components/display/Masthead';
import { cookieStorage } from '../lib/data/cookie.storage';
import { useAuth } from '../lib/store/store';

import { config } from '../res/config';

interface Props { }

const Index: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);

	return(
		<DefaultLayout auth={auth} >
			<Box align='center' >
				<Masthead heading={config.site_name} />
			</Box>
		</DefaultLayout>
	);
};

export const getServerSideProps = async (_context: any) => {
	const _auth = JSON.parse(await cookieStorage.getItem('auth-store', _context));
	const _upload_option = JSON.parse(await cookieStorage.getItem('upload-option', _context));

	return {
		props: { 
			state: {
				upload_option: JSON.stringify(_upload_option ? _upload_option.state : null),
				auth: JSON.stringify(_auth ? _auth.state : null)
			}
		}
	};
};

export default Index;
