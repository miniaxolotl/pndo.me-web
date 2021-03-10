import { NextSeoProps } from 'next-seo';

interface ConfigType {
	canonical: string;
	site_name: string;
	server: string;
	MAX_FILE: number;
	seo: NextSeoProps;
}

export default ConfigType;