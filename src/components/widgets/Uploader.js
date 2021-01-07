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
import LinearProgress from '@material-ui/core/LinearProgress';

const API_URL = 'https://modern-dashboard.herokuapp.com';

class Uploader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showFiles: false,
			isDragging: false,
			chosenFile: null,
			fileName: '',
			storage: '0MB',
			bytes: 0,
			storagePercent: 0,
			error: '',
			success: '',
			progress: 0,
			uploading: false,
			files: props.user.files,
			showClearButton: false
		}
		this.hideWidget = this.hideWidget.bind(this);
		this.toggleView = this.toggleView.bind(this);
		this.openFileBrowser = this.openFileBrowser.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
		this.handleFileName = this.handleFileName.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.updateStorage = this.updateStorage.bind(this);
		this.handleBrowseFile = this.handleBrowseFile.bind(this);
		this.handleClearButton = this.handleClearButton.bind(this);
		this.previewFile = this.previewFile.bind(this);
	}
	hideWidget() {
        const { setWidgets } = this.props;
		const { bookmarks, calendar, crypto, clock, weather, tasks } = this.props.activeWidgets;
        // Hide tasks widget
        var obj = {
            bookmarks,
            calendar,
            crypto,
            clock,
            tasks,
			weather,
			uploader: false,
        }
        setWidgets(obj);
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
			this.setState({ chosenFile: files[0], showClearButton: true });
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
			this.setState({ chosenFile: e.target.files[0], showClearButton: true });
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
		// If guest account
		if (this.props.user._id === '5ff774819aaf94001757d842') {
			this.setState({ error: 'Cannot upload files on guest account', showClearButton: true });
			setTimeout(() => { this.setState({ error: '' }) }, 3500);
			if (this.state.chosenFile === null) {
				this.setState({ showClearButton: false });
			}
		} else {
			if (this.state.chosenFile !== null && this.state.fileName.length > 1) {
				// Show upload progress bar
				this.setState({  showClearButton: false, uploading: true});
				// Size of new file converted to MB
				const newFileMB = this.state.chosenFile.size / 1000000;
				// Size of all files converted to MB
				const totalFileMB = this.state.bytes / 1000000;

				// If storage and new file will be more than 10MB total
				if (newFileMB + totalFileMB >= 10) {
					this.setState({ error: 'Storage full, make room or upload smaller file', uploading: false, showClearButton: true });
					// Hide error after 3.5 seconds
					setTimeout(() => { this.setState({ error: '' }) }, 3500);
				} else {
					// If storage and new file will be less than 10MB total
					if (newFileMB + totalFileMB < 10) {
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
								if (res.status === 200 && this.state.progress === 100) {
									this.updateStorage([...this.props.user.files, this.state.chosenFile]);
									this.props.uploadFile(this.props.user, res.data.user.files);
								}
							})
							.then(() => {
								this.props.getUserFiles(this.props.user);
								this.setState({ chosenFile: null, fileName: '', uploading: false });
							})
							.catch((err) => {
								if (err.response) {
									if (err.response.status === 429) {
										this.setState({ error: err.response.data });
										setTimeout(() => {
											this.setState({ error: null, uploading: false, progress: 0 });
										}, 3500);
									}
								}
							});
					}
				}
			}
		}
		if (this.state.chosenFile === null) {
			this.setState({ error: 'Please add a file' });
			setTimeout(() => { this.setState({ error: '' }) }, 3500);
		}
	}
	handleDelete(user, file) {
		this.setState({ files: user.files.filter((f) => f._id !== file._id) })
		this.props.deleteFile(user, file);
		this.updateStorage(user.files.filter((f) => f._id !== file._id));
	}
	// Convert bytes
	convertBytes(bytes, num) {
		var i = Math.floor(Math.log(bytes) / Math.log(1024)),
			sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		return `${(bytes / Math.pow(1024, i)).toFixed(num) * 1}${sizes[i]}`;
	}
	// Update File Storage
	updateStorage(files) {
		// If at least one file
		if (files.length >= 1) {
			const numbers = [];
			files.forEach(file => {
				if (file.length !== undefined) {
					numbers.push(file.length);
				}
				if (file.size !== undefined) {
					numbers.push(file.size);
				}
			});
			for (var i = 0; i <= files.length; i++) {
				numbers.push(files.length);
			}
			const getSum = (total, num) => {
				return total + num;
			}
			this.setState({
				storage: this.convertBytes(numbers.reduce(getSum), 2),
				storagePercent: parseInt((((numbers.reduce(getSum) / 1024) / 10000) * 100).toFixed()),
				bytes: numbers.reduce(getSum)
			});
		}
		// If no files
		if (files.length === 0) {
			this.setState({ storage: 0, storagePercent: 0 });
		}
	}
	handleClearButton() {
		this.setState({ chosenFile: null, fileName: '', showClearButton: false })
	}
	previewFile(e, file) {
		e.preventDefault();
		this.props.toggleMediaModal(true);
		this.props.viewFile(file);
	}
	UNSAFE_componentWillMount() {
		this.props.getUserFiles(this.props.user);
		// this.setState({ files: this.props.user.files });
	}
	componentDidMount() {
		this.updateStorage(this.props.user.files);
	}
	render() {
		const { user } = this.props;
		const { showFiles, chosenFile } = this.state;
		return (
			<div id="uploader" className="widget">
				<div className="delete-widget" onClick={this.hideWidget}><Close /></div>
				<div className="header">
					<h1>{showFiles === true ? `Your Files (${user.files.length})` : 'Upload'}</h1>
					<h6 onClick={this.toggleView}>{showFiles === true ? 'Upload' : `View Files (${user.files.length})`}</h6>
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
							let canPreview = /[\/.](gif|jpg|jpeg|tiff|png|mpeg|mp3)$/.test(file.contentType);
							return (
								<div className="file" key={i}>
									{canPreview ? 
									<a href="/" onClick={e => this.previewFile(e, file)}>{file.metadata.name}</a>
									:
									<a href={`${'http://localhost:3001'}/user/files/download/${file.filename}/`} download>{file.metadata.name}</a>}
									<span>{this.convertBytes(file.length, 1)}</span>
									<DeleteIcon onClick={() => this.handleDelete(user, file)} />
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
					{this.state.showClearButton ? <Button onClick={this.handleClearButton} size="small" variant="contained" color="default">Clear</Button> : null}
					{this.state.uploading ? 
					<div className="upload-progress">
						<LinearProgress variant="determinate" value={this.state.progress} />
						<p>{this.state.progress}%</p>
					</div> : null}
				</form>}
				<div className="storage">
					<span>{this.state.storage} / 10MB</span>
					<LinearProgress variant="determinate" value={this.state.storagePercent} />
				</div>

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