/**
 * Login.tsx
 * - User login form.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

import { useDispatch } from 'react-redux';
import { useState, SyntheticEvent } from 'react';

interface Props {
	loginFunc: (e: React.MouseEvent<HTMLInputElement>) => boolean;
	registerFunc: (e: React.MouseEvent<HTMLInputElement>) => boolean;
}

const HybridForm: React.FunctionComponent<Props> =
	({ loginFunc, registerFunc }) => {

	const dispatch = useDispatch();
	const [statusMessage, setData] = useState("");
	const errMessage = "invalid username or password";
	
	const clear_defaults = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const login = (e: React.MouseEvent<HTMLInputElement>) => {
		const status = loginFunc ? loginFunc(e) : false;
		status ? null : setData(errMessage);
	}

	const register = (e: React.MouseEvent<HTMLInputElement>) => {
		const status = registerFunc ? registerFunc(e) : false;
		status ? null : setData(errMessage);
	}
	
	return (
		<form onSubmit={clear_defaults}
		className="flex-direction-vertical section text-center HybridForm">

			<span className="color-red"> { statusMessage } </span>

			<input type="text" id="user" name="user"
			placeholder="username" required/>

			<input type="password" id="password" name="password"  placeholder="password" required/>

			<input type="submit" id="login" value="login"
			onClick={login} className="border-none outline color-sakura"/>

			<input type="submit" id="register" value="register"
			onClick={register} className="border-none outline color-grey"/>


		</form>
	);
};

export default HybridForm;