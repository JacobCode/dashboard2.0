import React, { Component } from 'react';
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

const API_URL = 'http://localhost:3001';

class Uploader extends Component {
	constructor() {
		super();
		this.state = {
			showFiles: false,
			isDragging: false,
			chosenFile: null,
			fileName: '',
			storage: '0MB',
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
		this.updateStorage = this.updateStorage.bind(this);
		this.handleBrowseFile = this.handleBrowseFile.bind(this);
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
	toggleView() {
		this.setState({ showFiles: !this.state.showFiles });
	}
	handleDrop(files, e) {
		if (files.length > 1) {
			this.setState({ error: 'Only one file at a time', isDragging: false });
			setTimeout(() => {
				this.setState({ error: '' })
			}, 5500);
		}
		if (files.length === 1) {
			this.setState({ chosenFile: files[0]});
		}
	}
	openFileBrowser() {
		document.getElementById('file-picker').click();
	}
	handleBrowseFile(e) {
		if (e.target.files.length > 1) {
			this.setState({ error: 'Only one file at a time' });
		}
		if (e.target.files[0] !== undefined && e.target.files.length === 1) {
			this.setState({ chosenFile: e.target.files[0] });
		}
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
		if (this.state.chosenFile !== null && this.state.fileName.length > 1) {
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

			// Set Form Data
			let data = new FormData();
			data.append('file', this.state.chosenFile, this.state.fileName);
			data.append('id', this.props.user._id);
			data.append('name', this.state.fileName);

			// Set headers and update upload progress
			const config = {
				headers: { 'content-type': 'multipart/form-data' },
				onUploadProgress: (progressEvent) => {
					var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					this.setState({ progress: percentCompleted });
				}
			}
			axios.post(`${API_URL}/user/files/upload`, data, config)
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data.user);
						// this.props.uploadFile(this.props.user, res.data.user.files);
						this.setState({ chosenFile: null, fileName: '' });
					}
				})
				.then(() => {
					this.props.getUserFiles(this.props.user);
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
	// Update File Storage
	updateStorage(files) {
		if (files.length >= 1) {
			const numbers = [];
			files.forEach(file => {
				numbers.push(file.length)
			});
			for (var i = 0; i <= files.length; i++) {
				numbers.push(files.length);
			}
			const getSum = (total, num) => {
				return total + num;
			}
			console.log(this.convertBytes(numbers.reduce(getSum), 2));
			this.setState({ storage: this.convertBytes(numbers.reduce(getSum), 2) });
		}
	}
	UNSAFE_componentWillMount() {
		this.props.getUserFiles(this.props.user);
	}
	componentDidMount() {
		if (this.props.user.files.length >= 1) {
			this.updateStorage(this.props.user.files);
		}
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		// console.log("UPDATED PROPS");
	}
	render() {
		const { user, deleteFile } = this.props;
		const { showFiles, chosenFile } = this.state;
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
						{user.files.length === 0 ? 
						<div className="no-files">
							No Files
						</div> : 
						user.files.map((file, i) => {
							return (
								<div className="file" key={i}>
									<a href={`${API_URL}/user/files/download/${file.filename}/`} download>{file.metadata.name}</a>
									<span>{this.convertBytes(file.length, 1)}</span>
									<DeleteIcon onClick={() => deleteFile(user, file, user.files)} />
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
						{chosenFile === null ? <h5>Drag file here or <span onClick={this.openFileBrowser}>browse</span></h5> : <h5 className="name">{chosenFile.name}</h5>}
						<input id="file-picker" type="file" onChange={this.handleBrowseFile} />
					</FileDrop>
					<Button type="submit" variant="contained" color="primary">
						Upload
					</Button>
				</form>}
				<span className="storage">
					{this.state.storage} / 10MB
				</span>

				{/* Error Snackbar */}
				<Snackbar className="fixed-snackbar"
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					open={this.state.error.length > 0 ? true : false}
				>
					<SnackbarContent className="sn-bar error-snackbar"
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
					<SnackbarContent className="sn-bar success-snackbar"
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

export default Uploader;