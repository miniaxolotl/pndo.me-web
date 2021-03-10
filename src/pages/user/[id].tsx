import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo';

import { DefaultLayout } from '../../components/DefaultLayout';
import { Masthead } from '../../components/Masthead';
import { cookieStorage } from '../../lib/data/cookie.storage';
import { useAuth } from '../../lib/store/store';

import { config } from '../../res/config';

interface Props { }

const Login: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);

	const seo: NextSeoProps = {
		title: `${config.site_name}: view user`
	};

	return(
		<DefaultLayout auth={auth} seo={seo} >
			<Box align='center' >
				<Masthead site_name={config.site_name} />
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

export default Login;