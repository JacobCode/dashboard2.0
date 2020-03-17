import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Close from '@material-ui/icons/Close';

class MediaModal extends Component {
	render() {
		const { mediaOpen, toggleMediaModal, currentFile, viewFile } = this.props;
		const API_URL = 'https://modern-dashboard.herokuapp.com';
		console.log(currentFile);
		return (
			<Modal id="media-modal" open={mediaOpen}>
				<div className="media">
					<ClickAwayListener onClickAway={e => toggleMediaModal(false)}>
						{currentFile !== undefined ? 
						<div className="inner">
							<div className="close-modal" onClick={e => toggleMediaModal(false)}><Close /></div>
							<div className="preview-image" style={{backgroundImage: `url('${API_URL}/user/files/preview/${currentFile.filename}/')`}}>
							</div>
							<a href={`${API_URL}/user/files/download/${currentFile.filename}/`} download>Download</a>
						</div>
						:
						null}
					</ClickAwayListener>
				</div>
			</Modal>
		)
	}
}

export default MediaModal;