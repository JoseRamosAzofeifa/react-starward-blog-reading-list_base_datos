import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { store, actions } = useContext(Context);
	const handleSubmit = e => {
		e.preventDefault();
		if (email === "" || password === "") {
			alert("correo y contraseña son requeridos");
		}
		console.log(email, password);

		// FETCH
		const data = { email: email, password: password };

		fetch("https://3000-tan-hyena-49x6xrlf.ws-us03.gitpod.io/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
				if (data.msg) {
					alert(data.msg);
					setRedirect(false);
				} else {
					sessionStorage.setItem("u_token", data.token);
					actions.LoadFavoritos();
					actions.addUser(data.user);
					setRedirect(true);
				}
			})
			.catch(error => {
				console.error("Error:", error);
			});

		// setRedirect(true);
	};

	return (
		<div className="text-center mt-5 d-flex justify-content-center align-items-center">
			<form style={{ width: "400px" }} onSubmit={e => handleSubmit(e)}>
				<div className="form-floating mb-3">
					<Link to={"/register"}>
						<input type="submit" className="btn btn-primary" value="Register" />
					</Link>
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						onChange={e => setEmail(e.target.value)}
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						onChange={e => setPassword(e.target.value)}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			{redirect ? <Redirect to="/" /> : ""}
		</div>
	);
};
