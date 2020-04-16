import { useDispatch } from 'react-redux';
import { useState } from 'react';

import styles from "./hybrid.form.module.scss"

interface Props {
	loginFunc?: (username: string, password: string) => Promise<boolean>;
	registerFunc?: (username: string, password: string) => Promise<boolean>;
}

const HybridForm: React.FunctionComponent<Props> = (props) => {

	const dispatch = useDispatch();
	const [statusMessage, setData] = useState("");
	const registerErrMessage = "invalid or duplicate username";
	const loginErrMessage = "invalid login credentials";
	
	const clear_defaults = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const login = async (e: React.MouseEvent<HTMLInputElement>) => {
		let username =
			(document.getElementById('username') as HTMLInputElement).value;
		let password = 
			(document.getElementById('password') as HTMLInputElement).value;

		const status = props.loginFunc
			? await props.loginFunc(username, password) : false;
			
		status ? null : setData(loginErrMessage);
	}

	const register = async (e: React.MouseEvent<HTMLInputElement>) => {
		let username =
			(document.getElementById('username') as HTMLInputElement).value;
		let password = 
			(document.getElementById('password') as HTMLInputElement).value;

		const status = props.registerFunc
			? await props.registerFunc(username, password) : false;

		status ? null : setData(registerErrMessage);
	}
	
	return (
		<form onSubmit={clear_defaults}
		className={`${styles.form} section text-center`}>

			<input type="text" id="username" name="username"
			className={`text-center`} placeholder="username" />

			<input type="password" id="password" name="password"
			className={`text-center`}  placeholder="password" />

			<span className={`${styles.errorMessage}`}> { statusMessage } </span>

			<div className={`${styles.submitButtons} flex-direction-vertical`} >
				<input type="submit" id="register" value="register"
				onClick={register}
				className="border-none outline color-sakura"/>

				<input type="submit" id="login" value="login"
				onClick={login}
				className="border-none outline color-grey"/>
			</div>
		</form>
	);
};

export default HybridForm;