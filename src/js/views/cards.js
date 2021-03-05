import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Cards = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="">
			<div>
				<h1>Characters</h1>
			</div>
			<div className="row first">
				{!!store.people &&
					store.people.map((element, index) => {
						return (
							<div key={index} className="cards col-2" style={{ width: 18 + "rem" }}>
								<img
									src="https://cloudfront-us-east-1.images.arcpublishing.com/abccolor/IIFWHHDMVVDRVCW72ONTWMRQEQ.jpg"
									width="400"
									height="200"
									padding="5px"
									className="card-img-top"
									alt="..."
								/>
								<ul className="carac">
									<li>
										<i className="fab fa-jedi-order" />
										Gender: {element.genero}
									</li>
									<li>
										<i className="fab fa-jedi-order" />
										Eye color: {element.color_ojos}
									</li>
									<li>
										<i className="fab fa-jedi-order" />
										Hair color: {element.color_cabello}
									</li>
								</ul>
								<div className="card-body">
									<h5 className="card-title">{element.nombre}</h5>
									<Link to={"/character/" + index}>
										<span href="#" className="btn btn-warning boton">
											Learn more!
										</span>
									</Link>
									<button
										onClick={() => actions.addName(element.id, "character")}
										type="button"
										className="  cajaBoton btn btn-outline-warning float-right">
										<i className="far fa-heart text-center" id="corazon" />
									</button>
								</div>
							</div>
						);
					})}
			</div>
			<div>
				<h1>Planets</h1>
			</div>
			<div className="row second">
				{!!store.planets &&
					store.planets.map((element, index) => {
						return (
							<div key={index} className="cards col-2" style={{ width: 18 + "rem" }}>
								<img
									src="https://wallpaperaccess.com/full/2137901.jpg"
									width="400"
									height="200"
									padding="5px"
									className="card-img-top"
									alt="..."
								/>
								<ul className="carac">
									<li>
										<i className="fab fa-jedi-order" />
										Diameter: {element.diametro}
									</li>
									<li>
										<i className="fab fa-jedi-order" />
										Gratity: {element.gravedad}
									</li>
									<li>
										<i className="fab fa-jedi-order" />
										Terrain: {element.terreno}
									</li>
								</ul>
								<div className="card-body">
									<h5 className="card-title">{element.nombre}</h5>
									<Link to={"/planets/" + index}>
										<span href="#" className="btn btn-warning boton">
											Learn more!
										</span>
									</Link>
									<button
										onClick={() => actions.addName(element.id, "planet")}
										type="button"
										className="  cajaBoton btn btn-outline-warning float-right">
										<i className="far fa-heart text-center" id="corazon" />
									</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};
