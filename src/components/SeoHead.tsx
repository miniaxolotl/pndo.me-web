import { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

interface Props {
	seo?: NextSeoProps;
}

export const SeoHead: NextPage<Props> = (props: Props) => {
	const seo = {
		title: 'pndo.me',
		description: 'private file hosting service',
		openGraph: {

		},
		twitter: {

		},
		...props.seo
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