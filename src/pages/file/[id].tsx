import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo';

import { DefaultLayout } from '../../components/DefaultLayout';
import { DisplayFile } from '../../components/display/DisplayFile';
import { ImageTitle } from '../../components/display/ImageTitle';
import { Masthead } from '../../components/display/Masthead';
import { Title } from '../../components/display/Title';
import { cookieStorage } from '../../lib/data/cookie.storage';
import { prefetchFile } from '../../lib/net/file.info';
import { useAuth } from '../../lib/store/store';

import { config } from '../../res/config';

interface Props {
	file_id: string;
	authorized: boolean;
	file_data: FileLong;
}

const FileID: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);
	const title = _props.authorized ? _props.file_data.filename : 'unauthorized access';

	const full_url = `${config.server}/api/file/${_props.file_id}`;

	let seo: NextSeoProps = {};

	if(!_props.authorized) {
		seo = {
			...seo,
			title: `${config.site_name}: unauthorized access`,
			description: 'you are not authorized to view this file.'
		};
	} else {
		seo = {
			...seo,
			title: `${config.site_name}: ${title}`
		};
		if(_props.file_data.type.includes('image')) {
			const openGraph = {
				images: [ {
					alt: title,
					url: full_url
				} ]
			};
			seo.openGraph = openGraph;
		}
	}

	return(
		<DefaultLayout auth={auth} seo={seo} >
			<Box align='center' >
				<Masthead heading={config.site_name}/>
				{(() => {
					if(_props.authorized) {
						return (
							<>
								<ImageTitle filename={title} album_id={_props.file_data.album_id} />
								<DisplayFile file_data={_props.file_data} file_id={_props.file_id} />
							</>
						);
					} else {
						return (
							<Title heading={title} />
						);
					}
				})()}
			</Box>
		</DefaultLayout>
	);
};

export const getServerSideProps = async (_context: any) => {
	const _auth = JSON.parse(await cookieStorage.getItem('auth-store', _context));
	const _upload_option = JSON.parse(await cookieStorage.getItem('upload-option', _context));
	const _upload_history = JSON.parse(await cookieStorage.getItem('upload-history', _context));

	const _file_data = await prefetchFile(_context.params.id, cookieStorage.getItem('session_id', _context));

	return {
		props: {
			file_id: _context.params.id,
			authorized: !!_file_data,
			file_data: _file_data,
			state: {
				upload_history: JSON.stringify(_upload_history ? _upload_history.state : null),
				upload_option: JSON.stringify(_upload_option ? _upload_option.state : null),
				auth: JSON.stringify(_auth ? _auth.state : null)
			}
		}
	};
};

export default FileID;