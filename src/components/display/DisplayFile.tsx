import { FiDownload } from 'react-icons/fi';
import filesize from 'file-size';
import { Badge, Button, Fade, Flex, Icon, Input, Spinner, Tag, TagLabel, Text, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { ImagePreview } from './ImagePreview';
import { VideoPreview } from './VideoPreview';
import { downloadFile } from '../../lib/net/file.download';

import { config } from '../../res/config';
import style from './DisplayFile.module.css';

interface Props {
	file_id: string;
	file_data: FileLong;
}

export const DisplayFile: React.FunctionComponent<Props> = (_props) => {
	const { colorMode } = useColorMode();
	const [ opacitySHA, useOpacitySHA ] = useState(1);
	const [ opacityMD5, useOpacityMD5 ] = useState(1);
	const [ opacityDL, useOpacityDL ] = useState(1);
	const [ opacityPage, useOpacityPage ] = useState(1);
	const [ type, useType ] = useState(null);
	const [ preview, usePreview ] = useState(null);
	const [ loading, useLoading ] = useState(false);
	const [ loaded, useLoaded ] = useState(false);
	const [ isDownloading, useIsDownloading ] = useState(false);

	const date = new Date(_props.file_data.create_date);
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth();
	const day = date.getUTCDay() < 10 ? '0' + date.getUTCDay() : date.getUTCDay();
	const create_date = `${year}-${month}-${day}`;

	const full_url = `${config.canonical}/api/${preview ? 'stream' : 'file'}/${_props.file_id}`;
	const page_url = `${config.canonical}/file/${_props.file_id}`;
	
	useEffect(() => {
		(async () => {
			if(_props.file_data.type.includes('image')) {
				useType('image');
			} else if (_props.file_data.type.includes('video')) {
				useType('video');
			}
		})();
	}, []);

	const _openPreview = async () => {
		useLoading(true);
		if(type === 'image') {
			const _anchor = await downloadFile(_props.file_data, _props.file_id);
			usePreview((_anchor as HTMLAnchorElement).href);
		} else if (type === 'video') {
			usePreview(`${config.canonical}/api/stream/${_props.file_id}`);
		}
		useLoading(false);
		useLoaded(true);
	};
	
	const _copySHA = (e: any) => {
		e.target.select();
		document.execCommand('copy');
		const tmp = e.target.value;
		useOpacitySHA(0);
		setTimeout(() => {
			useOpacitySHA(1);
			e.target.value = tmp;
		}, 500);
	};

	const _copyMD5 = (e: any) => {
		e.target.select();
		document.execCommand('copy');
		const tmp = e.target.value;
		useOpacityMD5(0);
		setTimeout(() => {
			useOpacityMD5(1);
			e.target.value = tmp;
		}, 500);
	};

	const _copyDL = (e: any) => {
		e.target.select();
		document.execCommand('copy');
		const tmp = e.target.value;
		useOpacityDL(0);
		setTimeout(() => {
			useOpacityDL(1);
			e.target.value = tmp;
		}, 500);
	};

	const _copyPage = (e: any) => {
		e.target.select();
		document.execCommand('copy');
		const tmp = e.target.value;
		useOpacityPage(0);
		setTimeout(() => {
			useOpacityPage(1);
			e.target.value = tmp;
		}, 500);
	};

	const _downloadfile = async () => {
		useIsDownloading(true);
		const _anchor = await downloadFile(_props.file_data, _props.file_id);
		if(_anchor) {
			(_anchor as HTMLAnchorElement).click();
		}
		useIsDownloading(false);
	};
	
	return (
		<Flex justifyContent="center" alignItems="center" direction="column">
			<Flex marginTop="2rem" direction='column' gridGap={2} alignItems="center">
				<Flex gridGap={2} wrap='wrap' justifyContent="center">
					<Tag colorScheme="cyan" borderRadius="full" whiteSpace='nowrap' >
						{ _props.file_data.type }
					</Tag>
					<Tag colorScheme="cyan" borderRadius="full" whiteSpace='nowrap' >
						{ filesize(_props.file_data.bytes).human('si') }
					</Tag>
					<Tag colorScheme="cyan" borderRadius="full" whiteSpace='nowrap' >
						{ create_date }
					</Tag>
					{(() => {
						if(_props.file_data.protected) {
							return (
								<>
									<Tag colorScheme='cyan' borderRadius="full" whiteSpace='nowrap' >
										<Badge colorScheme="yellow" borderRadius="full"> { _props.file_data.v_count} </Badge>
										<TagLabel> views </TagLabel>
									</Tag>

									<Tag colorScheme='cyan' borderRadius="full" whiteSpace='nowrap' >
										<Badge colorScheme="yellow" borderRadius="full"> { _props.file_data.d_count} </Badge>
										<TagLabel> downloads </TagLabel>
									</Tag>
								</>
							);
						} 
					})()}
					<Tag colorScheme={_props.file_data.protected
						? 'green' : 'red'} borderRadius="full" whiteSpace='nowrap'>
						{ _props.file_data.protected ? 'private' : 'public' } 
					</Tag>
				</Flex>
				{(() => {
					if(loaded) {
						if(type === 'image') {
							return (
								<ImagePreview url={preview} />
							);
						} else if(type === 'video') {
							return (
								<VideoPreview url={preview} type={_props.file_data.type} />
							);
						}
					} else if(loading) {
						return (
							<Spinner />
						);
					} else if(type) {
						return (
							<Text onClick={_openPreview} _hover={{ cursor: 'pointer' }} margin='1rem'>
								open preview
							</Text>
						);
					}
				})()}
				<Flex className={colorMode === 'dark' ? style.hashCard : style.hashCardLight} gridGap='2'>
					<Tag borderRadius="full" paddingLeft="0" width='50%'>
						<Fade animate={{ opacity: opacitySHA }}
							transition={{ duration: 0.5, ease: 'easeIn' }} >
							<Input borderRadius="full" type="text" size="xs"
								value={_props.file_data.sha256} aria-label='sha256'
								variant="filled" onClick={_copySHA} readOnly />
						</Fade>
						sha256
					</Tag>
					<Tag borderRadius="full" paddingLeft="0" width='50%'>
						<Fade animate={{ opacity: opacityMD5 }}
							transition={{ duration: 0.5, ease: 'easeIn' }} >
							<Input borderRadius="full" type="text" size="xs" value={_props.file_data.md5} 
								variant="filled" aria-label='md5' onClick={_copyMD5} readOnly />
						</Fade>
						md5
					</Tag>
				</Flex>
				<Flex className={colorMode === 'dark' ? style.hashCard : style.hashCardLight} gridGap='2'>
					<Tag borderRadius="full" paddingLeft="0" width='50%'>
						<Fade animate={{ opacity: opacityPage }}
							transition={{ duration: 0.5, ease: 'easeIn' }} >
							<Input borderRadius="full" type="text" size="xs" value={page_url} 
								variant="filled" aria-label='direct link' onClick={_copyPage} readOnly />
						</Fade>
						link
					</Tag>
					<Tag borderRadius="full" paddingLeft="0" width='50%'>
						<Fade animate={{ opacity: opacityDL }}
							transition={{ duration: 0.5, ease: 'easeIn' }} >
							<Input borderRadius="full" type="text" size="xs" value={full_url}
								variant="filled" aria-label='direct link' onClick={_copyDL} readOnly/>
						</Fade>
						direct
					</Tag>
				</Flex>
				<Flex
					className={colorMode === 'dark' ? style.hashCard : style.hashCardLight}>
				</Flex>
				<Flex marginY="0.125rem">
					<Button onClick={_downloadfile}
						isLoading={isDownloading}
						disabled={isDownloading}
    					loadingText="downloading...">
						<Icon as={FiDownload} marginRight='4px' />
						Download
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};