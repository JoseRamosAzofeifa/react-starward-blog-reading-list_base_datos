const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			people: null,
			planets: null,
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loadPlanets: () => {
				//fetch().then().then(data => setStore({ "foo": data.bar }))

				fetch("https://3000-tan-hyena-49x6xrlf.ws-us03.gitpod.io/planets")
					.then(res => res.json())
					.then(data => {
						let arrayResults = data.message;
						setStore({ planets: arrayResults });
					});
			},

			loadPeople: () => {
				fetch("https://3000-tan-hyena-49x6xrlf.ws-us03.gitpod.io/people")
					.then(res => res.json())
					.then(data => {
						let arrayResults = data.message;
						setStore({ people: arrayResults });
					});
			},
			LoadFavoritos: () => {
				fetch("https://3000-tan-hyena-49x6xrlf.ws-us03.gitpod.io/users/favorites", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("u_token")
					}
					// body: JSON.stringify(data)
				})
					.then(response => response.json())
					.then(data => {
						console.log("Success:", data);
						let resultado = data.message;
						setStore({ favorites: resultado });
						// sessionStorage.setItem("u_token", data.token);
						// setRedirect(true);
					});
			},

			Logout: () => {
				sessionStorage.removeItem("u_token");
				setStore({ user: null });
				setStore({ login: false });
			},

			addName: (id, type) => {
				let data = {};
				if (type == "planeta") {
					data = { planeta_id: id, personajes_id: null };
				} else {
					data = { planeta_id: null, personajes_id: id };
				}
				console.log(data, "data");
				fetch("https://3000-tan-hyena-49x6xrlf.ws-us03.gitpod.io/users/favorites", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("u_token")
					},
					body: JSON.stringify(data)
				})
					.then(res => res.json())
					.then(data => {
						console.log(data);
						getActions().LoadFavoritos();
					});
			},

			deleteName: id => {
				fetch("https://3000-tan-hyena-49x6xrlf.ws-us03.gitpod.io/favorite/" + id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("u_token")
					}
				})
					.then(response => response.json())
					.then(data => {
						console.log(data);
						getActions().LoadFavoritos();
					});
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			addUser: user => {
				setStore({ user: user });
			}
		}
	};
};

export default getState;
