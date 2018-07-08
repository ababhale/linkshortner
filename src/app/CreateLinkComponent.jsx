import React from 'react';
import moment from 'moment';
// import RangeComponent from './RangeComponent.jsx'

class CreateLinkComponent extends React.Component {
	constructor (props) {
		super(props);
		this.originalLink = null;
		this.shortenLink = null;
		this.expiryDays = 0;
	}
	onCreateNewLink (event) {
		console.log('Form submit Event occurred');
		var originalLink = this.refs.originalLink.value;
		var newLink = this.refs.newLink.value;
		var form = this.refs.createLinkForm;
		if (form.checkValidity()) {
			this.props.addNewLink(originalLink, newLink);
		} else {
			form.classList.add('was-validated');
		}
		event.preventDefault();
		event.stopPropagation();
	}
	componentDidMount () {
		console.log('CreateLinkComponent is mounted');
		this.props.getSuggestion();
	}
	render () {
		var sussestionRadoiBtn = this.props.addLink.suggestions.map((link, i) => {
			return (
				<div key={link} className="form-check">
					<input 
						className="form-check-input"
						type="radio" 
						name="newLinkSuggestion" 
						id={link}
						value={link}
						onChange={this.props.setNewLink} 
					/>&nbsp;
					<label htmlFor={link} className="form-check-label"> {link} </label>
				</div>
			);
		});
		return (
			<form onSubmit={this.onCreateNewLink.bind(this)} noValidate ref="createLinkForm">
				<div className="form-group">
					<label>Enter Original Link</label>
					<input 
						className="form-control"
						defaultValue={this.props.addLink.originalLink}
						type="text" 
						ref="originalLink"
						onChange={this.props.setOriginalLink}
						required
					/>
					<div className="invalid-feedback">
				      Please enter Original Link to be shorten
				    </div>
					<small className="form-text text-muted">Link which you want to shorten</small>
				</div>

				<div className="form-group">
					<label>Expiry Days</label>
					<input 
						className="form-control"
						type="range" 
						ref="expiryDays"
						defaultValue={this.props.addLink.expiryDays}
						min={this.props.addLink.minDays} 
						max={this.props.addLink.maxDays}
						onChange={this.props.setExpiry}
						required
					/>
					<small className="form-text text-muted">
						<span>shorten link will be available from 
							<strong>{moment().format('DD MMMM YYYY, hh:mm a')} </strong> Till 
							<strong> {moment().add(this.props.addLink.expiryDays, 'days').format('DD MMMM YYYY, hh:mm a')}</strong>
						</span>
					</small>
				</div>

				<div className="form-group">
					<label>Link Name</label>
					<input 
						className="form-control"
						type="text" 
						ref="newLink"
						value={this.props.addLink.newLink}
						onChange={this.props.setNewLink}
						required
					/>
					<div className="invalid-feedback">
				    	Please enter new link or select new link
				    </div>
					<small className="form-text text-muted">
						<div>New link is <a>{window.location.origin}/{this.props.addLink.newLink}</a></div>
					</small>
					<div>
						<input type="button" value="Get Suggestion" onClick={this.props.getSuggestion} className="btn btn-secondary"/> &nbsp;
						<input type="submit" value="Submit" className="btn btn-primary"/>
					</div>
					<div>{sussestionRadoiBtn}</div>
				</div>
			</form>
		);
	}
}

module.exports = CreateLinkComponent;