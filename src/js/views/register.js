import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nombre, setNombre] = useState("");
	const [primer_apellido, setPrimer_apellido] = useState("");
	const [segundo_apellido, setSegundo_apellido] = useState("");
	const [redirect, setRedirect] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		if (email === "" || password === "") {
			alert("correo y contraseña son requeridos");
		}
		console.log(email, password);

		// FETCH
		const data = {
			email: email,
			password: password,
			nombre: nombre,
			primer_apellido: primer_apellido,
			segundo_apellido: segundo_apellido
		};

		fetch("https://3000-tan-hyena-49x6xrlf.ws-us03.gitpod.io/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
				setRedirect(true);
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
				</div>
				<div className="form-floating">
					<input
						type="nombre"
						className="form-control"
						id="floatingNombre"
						placeholder="nombre"
						onChange={e => setNombre(e.target.value)}
					/>
				</div>
				<div className="form-floating">
					<input
						type="primer_apellido"
						className="form-control"
						id="floatingPrimer_apellido"
						placeholder="primer_apellido"
						onChange={e => setPrimer_apellido(e.target.value)}
					/>
				</div>
				<div className="form-floating">
					<input
						type="segundo_apellido"
						className="form-control"
						id="floatingSegundo_apellido"
						placeholder="segundo_apellido"
						onChange={e => setSegundo_apellido(e.target.value)}
					/>
				</div>
				<label htmlFor="floatingPassword">Password</label>

				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			{redirect ? <Redirect to="/login" /> : ""}
		</div>
	);
};
