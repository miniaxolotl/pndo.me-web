import ConfigType from './config-example';

export const config: ConfigType = {
	canonical: 'https://home.emawa.io:3002',
	site_name: 'pndo.me',
	server: 'https://home.emawa.io:3002',
	MAX_FILE: (2**20)*500,
	seo: {
		title: 'pndo.me',
		description: 'pndo.me: clean, simple & private file hosting. \
		\nno limits, no logs, no ads.',
		openGraph: {
			type: 'website',
			url: 'https://home.emawa.io:3002',
			images: [ {
				alt:'website logo',
				url: 'https://home.emawa.io:3002/logo.png'
			}, {
				alt:'website logo alternate',
				url: 'https://home.emawa.io:3002/logo.svg'
			} ]
		},
		twitter: {
			cardType: '',
			site: 'songmawa',
			handle: 'songmawa'
		}
	}
};

