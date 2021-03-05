import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Planets } from "./views/planets";
import { Character } from "./views/character";
import { Cards } from "./views/cards";
import injectContext, { Context } from "./store/appContext";
import "../styles/home.scss";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./views/login";
import { Register } from "./views/register";
//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const { store, actions } = useContext(Context);
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column">
			<BrowserRouter basename={basename}>
				{!store.login ? <Redirect to="/login" /> : null}
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Cards />
						</Route>
						<Route exact path="/planets/:id">
							<Planets />
						</Route>
						<Route exact path="/character/:id">
							<Character />
						</Route>

						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
