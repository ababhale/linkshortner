import React from 'react';

class PieChartComponent extends React.Component {
	render () {
		var length = this.props.stats.length;
		var graphVar = {
			value: '',
			label: ''
		};
		this.props.stats.forEach(function (obj, index) {
			graphVar.value += obj.value;
			graphVar.value += (index < (length - 1)) ? ',' : '';
			graphVar.label += obj.key;
			graphVar.label += (index < (length - 1)) ? '|' : '';
		});
		debugger;
		var pieChartStat = (
			<div className="form-group row">
			    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">{this.props.graphLabel}</label>
			    <div className="col-sm-10 col-form-label">
			      <img src={'https://chart.googleapis.com/chart?chs=250x100&chd=t:' + graphVar.value + '&cht=p3&chl=' + graphVar.label}></img>
			    </div>
			</div>
		)
		return (
			<div>
				{pieChartStat}
			</div>
		);
	}
}

export default PieChartComponent;