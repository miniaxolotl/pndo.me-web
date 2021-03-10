import { NextPage } from 'next';
import { Box, useToast } from '@chakra-ui/react';

import { AuthAction } from '../lib/store/store.enum';
import { DefaultLayout } from '../components/DefaultLayout';
import { Masthead } from '../components/Masthead';
import { RegisterForm } from '../components/form/RegisterForm';
import { cookieStorage } from '../lib/data/cookie.storage';
import { postRegister } from '../lib/net/authenticate';
import { useAuth } from '../lib/store/store';
import { useRouter } from 'next/dist/client/router';

import { config } from '../res/config';

interface Props { }

const Index: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);
	const auth_d = useAuth((_state) => _state.dispatch);
	const router = useRouter();
	const toast = useToast();

	const register = async (_event) => {
		const responce = await postRegister(_event.target);
		if(responce) {
			auth_d({
				...responce.payload,
				authorization: responce.session_id,
				type: AuthAction.LOGIN
			});
			toast({
				title: `Logged in as: ${responce.payload.username}`,
				description: 'Successfully loggedin.',
				status: 'success',
				duration: 4000,
				isClosable: true
			});
			router.push('/', undefined);
		} else {
			toast({
			  title: 'Request failed',
			  description: 'Probably a duplicate username and/or email.',
			  status: 'error',
			  duration: 4000,
			  isClosable: true
			});
		}
	};

	return(
		<DefaultLayout auth={auth} >
			<Box align='center' >
				<Masthead site_name={config.site_name} />
				<RegisterForm formAction={register} />
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
