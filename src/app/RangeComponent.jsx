import React from 'react';
import ReactDOM from 'react-dom';

class RangeComponent extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isSliderMoving: false
		}
		this.moveSlider = this.moveSlider.bind(this);
		this.stopMovingSlider = this.stopMovingSlider.bind(this);
		this.startMovingSlider = this.startMovingSlider.bind(this);
		this.stopMovingSlider = this.stopMovingSlider.bind(this);

		this.containerEl = React.createRef();
		this.imageEl = React.createRef();
	}
	startMovingSlider () {
		console.log('Starting slider movement');
		this.containerEl.current.addEventListener('mousemove', this.moveSlider);
		this.containerEl.current.addEventListener('mouseleave', this.stopMovingSlider);
		
		this.setState({
			isSliderMoving: true
		});
	}
	moveSlider (event) {
		console.log('Slider moving');
		console.log(event.clientX, event.clientY);
		console.log(event.offsetX, event.offsetY);
	}
	stopMovingSlider () {
		console.log('Stopping slider movement');
		this.containerEl.current.removeEventListener('mousemove', this.moveSlider);
		this.containerEl.current.removeEventListener('mouseleave', this.stopMovingSlider);
		
		this.setState({
			isSliderMoving: false
		});
	}
	render () {
		var leftPercentage = (this.props.value / this.props.max) * 100;
		let leftStyle = {
			width: leftPercentage + '%'
		};
		let rightStyle = {
			width: (100 - leftPercentage) + '%'
		};
		let imagePosition = {
			left: leftPercentage - 30 + '%'
		};
		return (
			<div className="ux-range-component full-width" ref={this.containerEl}>
				<div className='left full-height float-left' style={leftStyle}></div>
				<div className='slider-image full-height inline-block' 
					onMouseDown={this.startMovingSlider} 
					onMouseUp={this.stopMovingSlider}
					style = {imagePosition}
					ref = {this.imageEl}
				>
				</div>
				<div className='right full-height float-right' style={rightStyle}></div>
			</div>
		)
	}
}

export default RangeComponent;