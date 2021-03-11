import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeoProps } from 'next-seo';
import React from 'react';

import { DefaultLayout } from '../../components/DefaultLayout';
import { DisplayAlbum } from '../../components/display/DisplayAlbum';
import { ImageTitle } from '../../components/display/ImageTitle';
import { Masthead } from '../../components/display/Masthead';
import { Title } from '../../components/display/Title';
import { cookieStorage } from '../../lib/data/cookie.storage';
import { prefetchAlbum } from '../../lib/net/file.info';
import { useAuth } from '../../lib/store/store';

import { config } from '../../res/config';

interface Props {
	album_id: string;
	authorized: boolean;
	album_data: { album: Album; files: FileShort[] };
}

const FileID: NextPage<Props> = (_props) => {
	const auth = useAuth((_state) => _state);
	const album = _props.album_data ? _props.album_data.album : null;
	const files = _props.album_data ? _props.album_data.files : null;

	const title = _props.authorized ? album.title : 'unauthorized access';
	// const full_url = `${config.server}/api/file/${_props.album_id}`;

	let seo: NextSeoProps = {};

	if(!_props.authorized) {
		seo = {
			title: `${config.site_name}: unauthorized access`,
			description: 'you are not authorized to view this file.'
		};
	} else {
		seo = {
			title: `${config.site_name}: album - ${title}`
		};
	}

	return(
		<DefaultLayout auth={auth} seo={seo} >
			<Box align='center' >
				<Masthead heading={config.site_name}/>
				{(() => {
					if(_props.authorized) {
						return (
							<>
								<ImageTitle filename='' album_id={_props.album_id} />
								<DisplayAlbum files={files} album={album} />
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

	const _album_data = await prefetchAlbum(_context.params.id, cookieStorage.getItem('session_id', _context));
	
	return {
		props: {
			album_id: _context.params.id,
			authorized: !!_album_data,
			album_data: _album_data,
			state: {
				upload_history: JSON.stringify(_upload_history ? _upload_history.state : null),
				upload_option: JSON.stringify(_upload_option ? _upload_option.state : null),
				auth: JSON.stringify(_auth ? _auth.state : null)
			}
		}
	};
};

export default FileID;