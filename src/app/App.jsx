import React from 'react';
import CreateLinkComponent from './CreateLinkComponent.jsx';
import $ from 'jquery';
import Modal from 'react-bootstrap4-modal';

class App extends React.Component {
	constructor () {
		super();

		this.state = {
			addLink: {
				originalLink: '',
				newLink: '',
				suggestions: [],
				minDays: 1,
				maxDays: 30,
				expiryDays: 1,
				open: false
			},
			stats: {}
		}
	}
	setNewLink (event) {
		var addLink = this.state.addLink;
		addLink.newLink = event.target.value;
		this.setState({
			addLink: addLink
		});
	}
	setOriginalLink (event) {
		var addLink = this.state.addLink;
		addLink.originalLink = event.target.value;
		this.setState({
			addLink: addLink
		});
	}
	setExpiry (event) {
		var addLink = this.state.addLink;
		addLink.expiryDays = event.target.value;
		this.setState({
			addLink: addLink
		});
	}
	addNewLink (originalLink, newLink) {
		var addLink = this.state.addLink;
		addLink.originalLink = originalLink;
		addLink.newLink = newLink;
		addLink.open = true;
		this.setState({
			addLink: addLink
		}, (state) => {
			this.createShortLink();
		});
	}
	createShortLink () {
		console.log('Create short link');
		var url = '/api/create-short-link';
		$.ajax({
			type: 'POST',
			url: url,
			contentType: 'application/json',
			data: JSON.stringify(this.state.addLink)
		}).then(function (response) {
			console.log('Short link created');
			console.log(response);
			var addLink = this.state.addLink;
			addLink.open = true;
			addLink.result = response;
			this.setState({
				addLink: addLink
			});
		}.bind(this), function (xhr) {
			console.log('API Failed');
			console.log(xhr);
			var addLink = this.state.addLink;
			addLink.open = true;
			if (xhr.responseJSON) {
				addLink.result = xhr.responseJSON;
			} else {
				addLink.result = {
					status: xhr.status,
					msg: xhr.responseText
				}
			}
			this.setState({
				addLink: addLink
			});
		}.bind(this));

	}
	getSuggestion () {
		console.log('getSuggestion');
		var links = ['foobar', 'barfoo', 'setfoo', 'getgoo'];
		var url = '/api/suggestions';
		var newLink = this.state.addLink.newLink;
		if (newLink) {
			url +='/' + newLink;
		}
		$.get(url)
		.then(function (response) {
			console.log(response)
			var addLink = this.state.addLink;
			addLink.suggestions = response.suggestions;
			this.setState({
				addLink: addLink
			});
		}.bind(this));
	}
	closePopup () {
		var addLink = this.state.addLink;
		addLink.open = false;
		this.setState({
			addLink: addLink
		});
	}
	render () {
		var addLinkResult = null;
		if (this.state.addLink.result) {
			if (this.state.addLink.result.status === '00') {
				var shortLink = window.location.origin + '/' + this.state.addLink.newLink;
				addLinkResult = (
					<div>
						<p>New short link created successfully!</p>
						<p>
							<a href={shortLink}>
								{shortLink}
							</a>
						</p>
					</div>
				);
			} else {
				addLinkResult = (
					<div>
						<p>Failed to create short link!</p>
						<p>{this.state.addLink.result.msg}</p>
					</div>
				)
			}
		}
		return (
			<div>
				<CreateLinkComponent 
					addLink={this.state.addLink} 
					addNewLink={this.addNewLink.bind(this)} 
					setNewLink={this.setNewLink.bind(this)}
					setExpiry={this.setExpiry.bind(this)}
					setOriginalLink={this.setOriginalLink.bind(this)}
					getSuggestion={this.getSuggestion.bind(this)}
				/>
				<Modal visible={this.state.addLink.open} dialogClassName="modal-dialog-centered">
			        <div className="modal-header">
			          <h5 className="modal-title">Add New Link</h5>
			        </div>
			        <div className="modal-body">
			          {addLinkResult}
			        </div>
			        <div className="modal-footer">
			          <button type="button" className="btn btn-primary" onClick={this.closePopup.bind(this)}>
			            Close
			          </button>
			        </div>
			      </Modal>
			</div>
		);
	}
}

export default App;