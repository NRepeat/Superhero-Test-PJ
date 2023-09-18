import React from "react";
import Home from "./pages/Home";
import SuperheroPage from "./pages/SuperheroPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./pages/Header";

function App(props) {
	return (
		<Router>
				<Header/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/superhero" component={SuperheroPage} />
			</Switch>
		</Router>
	);	
}

export default App;
