import React from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App.jsx';
import ShowAllLinks from './ShowAllLinks.jsx';
import NavigationComponent from './NavigationComponent.jsx';
import ShowStatsComponent from './ShowStatsComponent.jsx';

ReactDOM.render(
	<Router>		
		<div className="App container">
			<NavigationComponent />
			<Route path="/" exact component={App}></Route>
			<Route path="/all-links.html" component={ShowAllLinks}></Route>
			<Route path="/show-stats.html" component={ShowStatsComponent}></Route>
		</div>
	</Router>, 
document.getElementById('root'));