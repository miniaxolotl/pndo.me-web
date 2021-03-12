import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo';
import { Box, Spacer } from '@chakra-ui/react';

import { DefaultLayout } from '../components/DefaultLayout';
import { FileList } from '../components/display/FileList';
import { Masthead } from '../components/display/Masthead';
import { UploadTool } from '../components/features/UploadTool';
import { cookieStorage } from '../lib/data/cookie.storage';
import { useAuth, useUploadHistory, useUploadOption } from '../lib/store/store';

import { config } from '../res/config';

interface Props { }

const Index: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);
	const upload_option = useUploadOption((_state) => _state);
	const upload_history = useUploadHistory((_state) => _state);

	const _seo: NextSeoProps = { };

	return(
		<DefaultLayout auth={auth} seo={_seo} >
			<Box align='center' >
				<Masthead heading={config.site_name} subheading={`max ${config.MAX_FILE / 2**20}MB upload`} />
				<UploadTool auth={auth} upload_option={upload_option} />
			</Box>
			<Spacer height='1rem' />
			<FileList file_list={upload_history.file_list} />
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
