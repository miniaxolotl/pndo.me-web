/**
 * Header.tsx
 * Header
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-02-20
 */

import Head from 'next/head';

const Header: React.FunctionComponent =
	() => (
		<Head>
			<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/ashleycss@4.1.52/dist/themes/ashleycss-dark.min.css'/>
			<title>pandome</title>
		</Head>
	);

export default Header;