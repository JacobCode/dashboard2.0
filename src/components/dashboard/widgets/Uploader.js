import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileDrop from 'react-file-drop';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Close from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import { setWidgets, getUserFiles } from '../../../redux/actions/actions';

import '../../../scss/Uploader.scss';

const API_URL = 'http://localhost:3001';

class Uploader extends Component {
	constructor() {
		super();
		this.state = {
			showFiles: false,
			isDragging: false,
			chosenFile: null,
			fileName: '',
			storage: 0,
			error: '',
			success: '',
			progress: 0,
			uploading: false
		}
		this.hideWidget = this.hideWidget.bind(this);
		this.toggleView = this.toggleView.bind(this);
		this.openFileBrowser = this.openFileBrowser.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
		this.handleFileName = this.handleFileName.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
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
	handleDrop(files, e) {
		if (files.length > 1) {
			this.setState({ error: 'Only One File At A Time', isDragging: false });
			setTimeout(() => {
				this.setState({ error: '' })
			}, 5500);
		}
		if (files.length === 1) {
			this.setState({ chosenFile: files[0]});
		}
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
	handleFileName(e) {
		this.setState({ fileName: e.target.value });
	}
	handleUpload(e) {
		e.preventDefault();
		if (this.state.chosenFile !== null && this.state.fileName.length > 1) {// this.setState({ uploading: true });
			// If storage is more than 10MB (10000KB), prevent form submit and show error
			const storage = this.state.storage / 1024;
			const newFile = this.state.chosenFile.size / 1024;
			// If storage with new file is more than 10MB limit
			if (storage + newFile > 10000) {
				this.setState({ error: 'No room in your storage, make room by deleting files' });
				// Hide error after 3 seconds
				setTimeout(() => { this.setState({ error: null }) }, 3500);
			}
			// If file is more than 3000kb (3mb), prevent form from submit and show error
			if (newFile > 6000) {
				this.setState({ error: 'File is too big, please choose another'});
				// Hide error after 3 seconds
				setTimeout(() => { this.setState({ error: null }) }, 3500);
			}

			let data = new FormData();
			data.append('file', this.state.chosenFile, this.state.fileName);
			data.append('id', this.props.user._id);
			data.append('name', this.state.fileName);

			const config = {
				headers: { 'content-type': 'multipart/form-data' },
				onUploadProgress: (progressEvent) => {
					var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					this.setState({ progress: percentCompleted });
				}
			}
			axios.post(`${API_URL}/upload`, data, config)
				.then((res) => {
						if (res.status === 200) {
							this.setState({ chosenFile: null, fileName: '' });
							window.location.pathname = '/dashboard';
						}
					})
				.catch((err) => {
					if (err.response) {
						if (err.response.status === 429) {
							this.setState({ error: err.response.data });
							setTimeout(() => {
								this.setState({ error: null, uploading: false, progress: 0 });
							}, 3500)
						}
					}
				});
		}
	}
	// Convert bytes
	convertBytes(bytes, num) {
		var i = Math.floor(Math.log(bytes) / Math.log(1024)),
			sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		return `${(bytes / Math.pow(1024, i)).toFixed(num) * 1}${sizes[i]}`;
	}
	// Delete file by id
	deleteFile(e, file) {
		if (file) {
			console.log(`Delete File: ${file}`);
		}
	}
	UNSAFE_componentWillMount() {
		this.props.getUserFiles(this.props.user, this.props.user._id);
	}
	render() {
		const { files } = this.props.user;
		const { showFiles } = this.state;
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
									<a href={`${API_URL}/user/files/download/${file.filename}/`} download="TEST">{file.metadata.name}</a>
									<span>{this.convertBytes(file.length, 1)}</span>
									<DeleteIcon onClick={e => this.deleteFile(e, file)} />
								</div>
							)
						})}
					</div>
				</div> : 
				<form id="file-drop" onSubmit={this.handleUpload} method="POST" encType="multipart/form-data">
					<TextField
					label="File Name"
					margin="normal"
					variant="outlined"
					className="input"
					value={this.state.fileName}
					onChange={this.handleFileName}
					/>
					<h6>Attach File</h6>
					<FileDrop className="dropzone" onFrameDragEnter={this.handleDragEnter} onFrameDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
						{this.state.isDragging === false ? 
						<Button size="small" onClick={this.openFileBrowser} variant="contained" color="primary">
							Choose File
						</Button> : 
						<h5 className="drag">Drag File Here</h5>}
						{this.state.chosenFile !== null ? <h5 className="name">{this.state.chosenFile.name}</h5> : null}
						<input id="file-picker" type="file" />
					</FileDrop>
					<Button type="submit" variant="contained" color="primary">
						Upload
					</Button>
				</form>}

				{/* Error Snackbar */}
				<Snackbar className="fixed-snackbar"
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					open={this.state.error.length > 0 ? true : false}
				>
					<SnackbarContent className="sn-bar" id="error-snackbar"
						aria-describedby="error-snackbar"
						message={
							<span>
								{this.state.error}
								<ErrorIcon />
							</span>
						}
					/>
				</Snackbar>
				{/* Success Snackbar */}
				<Snackbar className="fixed-snackbar"
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					open={this.state.success.length > 0 ? true : false}
				>
					<SnackbarContent className="sn-bar" id="success-snackbar"
						aria-describedby="success-snackbar"
						message={
							<span>
								{this.state.success}
								<CheckCircleIcon />
							</span>
						}
					/>
				</Snackbar>
			</div>
		)
	}
}

Uploader.propTypes = {
    setWidgets: PropTypes.func.isRequired,
	activeWidgets: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	getUserFiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	activeWidgets: state.siteData.activeWidgets,
	user: state.siteData.user
});

export default connect(mapStateToProps, { setWidgets, getUserFiles })(Uploader);