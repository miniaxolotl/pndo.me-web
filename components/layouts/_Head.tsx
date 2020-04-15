import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { OpenGraphImages, Twitter } from 'next-seo/lib/types';

interface Props {
	title?: string;
	description?: string;
	url?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogUrl?: string;
	ogImages?: OpenGraphImages[];
	ogSiteName?: string;
	twSite?: string;
};

/**
 * SEO component
 * @param param0
 */
const Header: React.FunctionComponent<Props> = (props) => {

	const twitter: Twitter = {
		site: `@${props.twSite}`,
		cardType: 'summary_large_image',
	};

	return(
		<div>
			<Head>
				<link rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/ashleycss/dist/themes/ashleycss-dark.min.css" />
				<link rel="apple-touch-icon" href="/img/icon.png" />
			</Head>
			<NextSeo
				title={props.title}
				description={props.description}
				openGraph={{
					url: props.ogUrl,
					title: props.ogTitle,
					description: props.ogDescription,
					images: props.ogImages,
					site_name: props.ogSiteName,
				}}
				twitter={twitter} />
		</div>
	);
};

export default Header;
