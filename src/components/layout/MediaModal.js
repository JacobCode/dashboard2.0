import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Close from '@material-ui/icons/Close';

class MediaModal extends Component {
	constructor() {
		super();
		this.state = {

		}
		this.seek = this.seek.bind(this);
	}
	seek(e) {
		console.log(e);
	}
	render() {
		const { mediaOpen, toggleMediaModal, currentFile } = this.props;
		// const API_URL = 'https://modern-dashboard.herokuapp.com';
		const API_URL = 'http://localhost:3001';
		return (
			<Modal id="media-modal" open={mediaOpen}>
				<div className="media">
					<ClickAwayListener onClickAway={e => toggleMediaModal(false)}>
						{currentFile.metadata !== undefined ? 
						<div className="inner">
							{currentFile.contentType === 'audio/mpeg' ? 
							<div className="audio">
								<h1>File Name: <span>{currentFile.metadata.name}</span></h1>
								<div className="close-modal" onClick={e => toggleMediaModal(false)}><Close /></div>
								<audio onSeeked={this.seek} id="audio" autoPlay controls>
									<source type="audio/mpeg" src={`${API_URL}/user/files/preview/${currentFile.filename}`} />
									Cannot play audio on this browser
								</audio>
								<a href={`${API_URL}/user/files/download/${currentFile.filename}/`} download>Download</a>
							</div>
							:
							<div className="image">
								<h1>File Name: <span>{currentFile.metadata.name}</span></h1>
								<div className="close-modal" onClick={e => toggleMediaModal(false)}><Close /></div>
								<div className="preview-image" style={{backgroundImage: `url('${API_URL}/user/files/preview/${currentFile.filename}/')`}}>
								</div>
								<a href={`${API_URL}/user/files/download/${currentFile.filename}/`} download>Download</a>
							</div>}
						</div>
						:
						<div></div>}
					</ClickAwayListener>
				</div>
			</Modal>
		)
	}
}

export default MediaModal;