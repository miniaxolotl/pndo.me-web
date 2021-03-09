import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import theme from '../themes/default';

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="manifest" href="/manifest.json" />
      				<link rel='apple-touch-icon' href='/img/apple-icon.png'></link>
					<link href='/img/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
					<link href='/imf/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
					<link rel="shortcut icon" href="/favicon.ico" />
					<meta name='theme-color' content='#16161D' />
				</Head>
				<body>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}