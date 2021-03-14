import { NextSeoProps } from 'next-seo';

interface SiteTheme {
	/** location of background image */
	url: string;
	/** author of background image */
	source: string;
}

/** defines sitewide configurations */
interface ConfigType {
	/** name of the ite */
	site_name: string;
	/** canonical url */
	canonical: string;
	/** server url */
	server: string;
	/** max bytes for individual files */
	MAX_BYTES: number;
	/** default site wide soe tags */
	seo: NextSeoProps;
	/** theme data for website */
	theme: {
		dark: SiteTheme;
		light: SiteTheme;
	};
}

export default ConfigType;