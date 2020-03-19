import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Close from '@material-ui/icons/Close';

const MediaModal = (props) => {
	const { mediaOpen, toggleMediaModal, currentFile } = props;
	const API_URL = 'https://modern-dashboard.herokuapp.com';
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
							<audio onSeeked={(e) => {
								console.log(e);
							}} id="audio" autoPlay controls>
								<source type="audio/mpeg" src={`${API_URL}/user/files/preview/${currentFile.filename}`} />
								Cannot play audio on this browser
							</audio>
							<a href={`${API_URL}/user/files/download/${currentFile.filename}/`} download>Download</a>
						</div>
						:
						currentFile.contentType === 'audio/mp3' ? 
						<div className="audio">
							<h1>File Name: <span>{currentFile.metadata.name}</span></h1>
							<div className="close-modal" onClick={e => toggleMediaModal(false)}><Close /></div>
							<audio onSeeked={(e) => {
								console.log(e);
							}} id="audio" autoPlay controls>
								<source type="audio/mp3" src={`${API_URL}/user/files/preview/${currentFile.filename}`} />
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

export default MediaModal;