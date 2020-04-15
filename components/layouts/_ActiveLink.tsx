import { useRouter } from 'next/router'

interface Props {
	href?: string;
	clickFunc?: (e: any) => any;
};

const ActiveLink: React.FunctionComponent<Props> = (props) => {

	const router = useRouter();

	const handleClick = e => {
		e.preventDefault();
		router.push(props.href);
  	}

	return (
		<a href={props.href}
		onClick={props.clickFunc ? props.clickFunc : handleClick}
		className={router.pathname === props.href ? 'active-link' : null}>

			{props.children}
		</a>
	);
};

export default ActiveLink