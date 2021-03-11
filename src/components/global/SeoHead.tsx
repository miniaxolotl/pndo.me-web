import { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { config } from '../../res/config';

interface Props {
	seo?: NextSeoProps;
}

export const SeoHead: NextPage<Props> = (_props: Props) => {
	const seo = {
		...config.seo,
		..._props.seo
	};
	return(
		<>
			<NextSeo
				title={seo.title}
				description={seo.description}
				openGraph={seo.openGraph}
				twitter={seo.twitter} />
		</>
	);
};