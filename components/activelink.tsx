import { useRouter } from 'next/router'

import styles from "./activelink.module.scss"

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
		className={router.pathname === props.href ? styles.activeLink : null}>

			{props.children}
		</a>
	);
};

export default ActiveLink