import React from 'react';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Close from '@material-ui/icons/Close';

const MediaModal = (props) => {
	const { mediaOpen, toggleMediaModal, currentFile } = props;
	const API_URL = 'https://modern-dashboard.herokuapp.com';
	const forceDownload = (blob, filename) => {
		var a = document.createElement('a');
		a.download = filename;
		a.href = blob;
		a.click();
	}
	const downloadResource = (e, url, filename) => {
		e.preventDefault();
		fetch(url, {
			headers: new Headers({
        'Origin': window.location.origin
      }),
			mode: 'cors'
		})
		.then(response => response.blob())
		.then(blob => {
			let blobUrl = window.URL.createObjectURL(blob);
			forceDownload(blobUrl, filename);
		})
		.catch(e => console.error(e));
	}
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
							<a onClick={e => downloadResource(e, `${API_URL}/user/files/download/${currentFile.filename}/`, currentFile.filename)} download>Download</a>
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
							<a download onClick={e => downloadResource(e, `${API_URL}/user/files/download/${currentFile.filename}/`, currentFile.filename)}>Download</a>
						</div>
						:
						<div className="image">
							<h1>File Name: <span>{currentFile.metadata.name}</span></h1>
							<div className="close-modal" onClick={e => toggleMediaModal(false)}><Close /></div>
							<div className="preview-image" style={{backgroundImage: `url('${API_URL}/user/files/preview/${currentFile.filename}/')`}}>
							</div>
							<a download onClick={e => downloadResource(e, `${API_URL}/user/files/download/${currentFile.filename}/`, currentFile.filename)}>Download</a>
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