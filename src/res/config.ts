import ConfigType from './config-example';

export const config: ConfigType = {
	canonical: 'https://home.emawa.io:3002/',
	site_name: 'pndo.me',
	server: 'https://home.emawa.io:3002',
	MAX_FILE: (2**20)*500,
	seo: {
		title: 'pndo.me',
		description: 'providing clean and simple private file hosting. \
		\nNo limits, no logs, no ads.',
		openGraph: {
			url: 'https://home.emawa.io:3002',
			images: [ {
				alt:'website logo',
				url: 'https://home.emawa.io:3002/logo.svg'
			}, {
				alt:'website logo alternate',
				url: 'https://home.emawa.io:3002/logo.png'
			} ]
		},
		twitter: {
			cardType: '',
			site: 'songmawa',
			handle: 'songmawa'
		}
	}
};

