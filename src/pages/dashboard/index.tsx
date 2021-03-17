import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo';
import React from 'react';
import { Box, useToast } from '@chakra-ui/react';

import { DashboardForm } from '../../components/form/DashboardForm';
import { DefaultLayout } from '../../components/DefaultLayout';
import { Masthead } from '../../components/display/Masthead';
import { Title } from '../../components/display/Title';
import { cookieStorage } from '../../lib/data/cookie.storage';
import { patchUser } from '../../lib/net/authenticate';
import { useAuth, useUploadOption } from '../../lib/store/store';

import { config } from '../../res/config';
import { AuthAction, UploadOptionAction } from '../../lib/store/store.enum';

interface Props { }

const Index: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);
	const auth_d = useAuth((_state) => _state.dispatch);
	const upload_option_d = useUploadOption((_state) => _state.dispatch);
	const toast = useToast();

	const seo: NextSeoProps = {
		title: `${config.site_name}: dashboard`
	};

	const dashboard = async (_event) => {
		const responce = await patchUser(_event.target, auth.authorization);
		if(responce) {
			auth_d({
				...responce,
				authorization: responce.session_id,
				type: AuthAction.LOGIN
			});
			upload_option_d({
				type: UploadOptionAction.SET,
				protected: true,
				hidden: true
			});
			toast({
				title: `Success: ${responce.username}`,
				description: 'Successfully altered account:.',
				status: 'success',
				duration: 4000,
				isClosable: true
			});
		} else {
			toast({
				title: 'Request failed',
				description: 'Are you sure you are who you are ?',
				status: 'error',
				duration: 4000,
				isClosable: true
			});
		}
	};

	return(
		<DefaultLayout auth={auth} seo={seo} >
			<Box align='center' >
				<Masthead heading={config.site_name} />
				<Title heading='dashboard' />
				<DashboardForm formAction={dashboard} auth={auth} />
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

export default Index;