import { useDispatch } from 'react-redux';
import { useState } from 'react';

import styles from "./hybrid.form.module.scss"

interface Props {
	loginFunc?: (e: React.MouseEvent<HTMLInputElement>) => boolean;
	registerFunc?: (e: React.MouseEvent<HTMLInputElement>) => boolean;
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

	const login = (e: React.MouseEvent<HTMLInputElement>) => {
		const status = props.loginFunc ? props.loginFunc(e) : false;
		status ? null : setData(loginErrMessage);
	}

	const register = (e: React.MouseEvent<HTMLInputElement>) => {
		const status = props.registerFunc ? props.registerFunc(e) : false;
		status ? null : setData(registerErrMessage);
	}
	
	return (
		<form onSubmit={clear_defaults}
		className={`${styles.form} section text-center`}>

			<input type="text" id="username" name="username"
			className={`text-center`} placeholder="username" required/>

			<input type="password" id="password" name="password"
			className={`text-center`}  placeholder="password" required/>

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