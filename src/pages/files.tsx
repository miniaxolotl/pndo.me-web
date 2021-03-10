import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo';

import { DefaultLayout } from '../components/DefaultLayout';
import { Masthead } from '../components/display/Masthead';
import { Title } from '../components/display/Title';
import { cookieStorage } from '../lib/data/cookie.storage';
import { useAuth } from '../lib/store/store';

import { config } from '../res/config';

interface Props { }

const Login: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);

	const seo: NextSeoProps = {
		title: `${config.site_name}: files`
	};

	return(
		<DefaultLayout auth={auth} seo={seo} >
			<Box align='center' >
				<Masthead heading={config.site_name} />
				<Title heading='my files' />
			</Box>
		</DefaultLayout>
	);
};

export const getServerSideProps = async (_context: any) => {
	const _auth = JSON.parse(await cookieStorage.getItem('auth-store', _context));
	const _upload_option = JSON.parse(await cookieStorage.getItem('upload-option', _context));
	const _upload_history = JSON.parse(await cookieStorage.getItem('upload-history', _context));

	return {
		props: { 
			state: {
				upload_history: JSON.stringify(_upload_history ? _upload_history.state : null),
				upload_option: JSON.stringify(_upload_option ? _upload_option.state : null),
				auth: JSON.stringify(_auth ? _auth.state : null)
			}
		}
	};
};

export default Login;