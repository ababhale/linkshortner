import React from 'react';
import $ from  'jquery';
import moment from 'moment';
import PieChartComponent from './PieChartComponent.jsx'

class ShowStatsComponent extends React.Component {
	constructor (props) {
		super(props);
		console.log(props);
		var params = {};
		var queryStrArr = props.location.search.split('?');
		if (queryStrArr.length > 1) {
			var queryParams = queryStrArr[1].split('&');
			for (var i = 0; i < queryParams.length; i++) {
				var paramArr = queryParams[i].split('=');
				params[paramArr[0]] = paramArr[1];
			}
		}

		this.state = {
			link: params.link,
			stats: {
				userstats: {}
			}
		}
	}
	componentDidMount () {
		console.log(this.state);
		var url = '/api/retrieve-single-link/' + this.state.link;
		$.ajax({
			type: 'GET',
			url: url
		}).then(function (response) {
			var stats = this.state.stats;

			console.log('Data received');
			this.setState({
				stats: response.data
			});
		}.bind(this), function () {

		}.bind(this));
	}

	render () {
		var browserStats = '';
		if (this.state.stats.userstats && this.state.stats.userstats.byBrwoser) {
			browserStats = (<PieChartComponent stats={this.state.stats.userstats.byBrwoser} graphLabel ="Browser Stats"/>)
		}

		var deviceStats = '';
		if (this.state.stats.userstats && this.state.stats.userstats.byDeviceType) {
			deviceStats = (<PieChartComponent stats={this.state.stats.userstats.byDeviceType} graphLabel ="Device Stats"/>)
		}

		var osStats = '';
		if (this.state.stats.userstats && this.state.stats.userstats.byOs) {
			osStats = (<PieChartComponent stats={this.state.stats.userstats.byOs} graphLabel ="OS Stats"/>)
		}

		return (
			<form>
			  <div className="form-group row">
			    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Original link</label>
			    <div className="col-sm-10 col-form-label">
			      <a href={this.state.stats.redirectTo}>{this.state.stats.redirectTo}</a>
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Short Link</label>
			    <div className="col-sm-10 col-form-label">
			      <a href={window.location.origin + '/' + this.state.stats.hash}>
			      	{window.location.origin + '/' + this.state.stats.hash}
			      </a>
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Created on</label>
			    <div className="col-sm-10 col-form-label">
			      {moment(this.state.stats.createtionDate).format('DD MMMM YYYY, hh:mm a')}
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Valid Till</label>
			    <div className="col-sm-10 col-form-label">
			      {moment(this.state.stats.createtionDate).add(this.state.stats.validTill, 'days').format('DD MMMM YYYY, hh:mm a')}
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Access Count</label>
			    <div className="col-sm-10 col-form-label">
			      {this.state.stats.accessCnt}
			    </div>
			  </div>
			  {browserStats}
			  {deviceStats}
			  {osStats}
			</form>
		);
	}
}

export default ShowStatsComponent;