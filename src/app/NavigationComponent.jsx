import React from 'react';

class NavigationComponent extends React.Component {
	render () {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light ux-nav-component">
			  <a className="navbar-brand" href="#">LinkShortner</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item active">
			        <a className="nav-link" href="/">Home</a>
			      </li>
			      <li className="nav-item">
			        <a className="nav-link" href="/all-links.html">All Links</a>
			      </li>
			    </ul>
			  </div>
			</nav>
		);
	}
}

export default NavigationComponent;