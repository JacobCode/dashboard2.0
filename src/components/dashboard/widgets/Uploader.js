import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileDrop from 'react-file-drop';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { setWidgets } from '../../../redux/actions/actions';

import '../../../scss/Uploader.scss';

import Close from '@material-ui/icons/Close';

class Uploader extends Component {
	constructor() {
		super();
		this.state = {
			showFiles: false,
			isDragging: false
		}
		this.hideWidget = this.hideWidget.bind(this);
		this.toggleView = this.toggleView.bind(this);
		this.openFileBrowser = this.openFileBrowser.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
	}
	hideWidget() {
        // Hide Uploader widget
        var obj = {
            bookmarks: this.props.activeWidgets.bookmarks,
            calendar: this.props.activeWidgets.calendar,
            crypto: this.props.activeWidgets.crypto,
            Uploader: this.props.activeWidgets.Uploader,
            tasks: this.props.activeWidgets.tasks,
			weather: this.props.activeWidgets.weather,
			uploader: false
        }
        this.props.setWidgets(obj);
	}
	handleDrop(files, event) {
		console.log(files, event);
	}
	toggleView() {
		this.setState({ showFiles: !this.state.showFiles });
	}
	openFileBrowser() {
		document.getElementById('file-picker').click();
	}
	handleDragEnter() {
		if (this.state.isDragging !== true) {
			this.setState({ isDragging: true });
		}
	}
	handleDragLeave() {
		if (this.state.isDragging !== false) {
			this.setState({ isDragging: false });
		}
	}
	render() {
		const { files } = this.props.user;
		const { showFiles } = this.state;
		console.log(files);
		return (
			<div id="uploader" className="widget">
				<div className="delete-widget" onClick={this.hideWidget}><Close /></div>
				<div className="header">
					<h1>{showFiles === true ? 'Your Files' : 'Upload'}</h1>
					<h6 onClick={this.toggleView}>{showFiles === true ? 'Upload' : 'View Files'}</h6>
				</div>
				{/* If show files, show uploads */}
				{showFiles === true ? 
				<div id="file-uploads">
					<div className="files">
						{/* If no files */}
						{files.length === 0 ? 
						<div className="no-files">
							No Files
						</div> : 
						files.map((file, i) => {
							return (
								<div className="file" key={i}>

								</div>
							)
						})}
					</div>
				</div> : 
				<div id="file-drop">
					<TextField
					label="Outlined"
					margin="normal"
					variant="outlined"
					className="input"
					/>
					<h6>Attach File</h6>
					<FileDrop className="dropzone" onFrameDragEnter={this.handleDragEnter} onFrameDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
						{this.state.isDragging === false ? 
						<Button size="small" onClick={this.openFileBrowser} variant="contained" color="primary">
							Choose File
						</Button> : 
						<h5>Drag Files Here</h5>}
						<input id="file-picker" type="file" />
					</FileDrop>
				</div>}
			</div>
		)
	}
}

Uploader.propTypes = {
    setWidgets: PropTypes.func.isRequired,
	activeWidgets: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	activeWidgets: state.siteData.activeWidgets,
	user: state.siteData.user
});

export default connect(mapStateToProps, { setWidgets })(Uploader);