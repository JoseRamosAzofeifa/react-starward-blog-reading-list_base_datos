import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="container-fluid ">
			<div className="header">
				<nav className="navbar sticky-top navbar-dark bg-dark">
					<div className="container-fluid">
						<a className="navbar-brand ms-5" href="#">
							<img
								src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
								width="90px"
							/>
						</a>

						<div className="dropdown">
							<Link to={"/login"}>
								<button
									className="btn btn-danger dropdown-toggle"
									type="button"
									onClick={() => actions.Logout()}>
									Logout
								</button>
							</Link>
							<button
								className="btn btn-danger dropdown-toggle"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								Favorites
							</button>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								{!!store.favorites &&
									store.favorites.map((element, index) => {
										return (
											<div key={index}>
												<div className="trash">
													<p className="elemen">{element.nombre}</p>
													<button
														onClick={() => actions.deleteName(element.id)}
														className="fas fa-trash"
														id="bote"
													/>
												</div>
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};
