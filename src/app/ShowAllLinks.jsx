import React from 'react';
import $ from 'jquery';

class ShowAllLinks extends React.Component {
	constructor () {
		super();
		this.state = {
			links: null
		}
	}
	componentDidMount () {
		this.getLinks();
	}
	getLinks () {
		var pageno = 1;
		var noOfRecords = 50;
		var url = '/api/retrieve-all-links?pn=' + pageno + '&records=' + noOfRecords;
		$.ajax({
			type: 'GET',
			url: url
		}).then(function (response) {
			var links = response.data;
			this.setState({
				links: links	
			});
		}.bind(this), function (err) {
		}.bind(this));
	}
	render () {
		var links = [];
		var cnt = 0;
		if (this.state.links) {
			for (var i in this.state.links) {
				var obj = this.state.links[i];
				var shortLink = window.location.origin + '/' + obj.hash;
				var showStatsLink = '/show-stats.html?link=' + obj.hash;
				var linkEl = (
					<tr key={i}>
						<th scope="row">
							<a className="btn btn-primary" href={showStatsLink}>Stats {obj.accessCnt}</a>
						</th>
						<td>
							<a href={shortLink}>{shortLink}</a>
						</td>
						<td>
							<a href={obj.redirectTo}>{obj.redirectTo}</a>
						</td>
					</tr>
				);
				links.push(linkEl);
			}
		}
		
		return (
			<div className="table-responsive">
				<table className="table table-striped">
					<thead className="thead-dark">
						<tr>
							<th scope="col">Access Cnt</th>
							<th scope="col">Short Link</th>
							<th scope="col">Original Link</th>
						</tr>
					</thead>
					<tbody>
						{links}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ShowAllLinks;