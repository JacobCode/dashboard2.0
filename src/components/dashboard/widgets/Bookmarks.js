import React, { Component } from 'react';

import BookmarkIcon from "@material-ui/icons/NoteAdd";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';

// SCSS
import '../../../scss/Bookmarks.scss';

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBookmarkForm: false,
            bookmarks: props.bookmarks,
            name: '',
            url: ''
        }
        this.addBookmark = this.addBookmark.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUrlInput = this.handleUrlInput.bind(this);
        this.hideWidget = this.hideWidget.bind(this);
    }
    toggleForm() {
        this.setState({
            showBookmarkForm: !this.state.showBookmarkForm
        })
    }
    handleNameInput(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleUrlInput(e) {
        this.setState({
            url: e.target.value
        })
    }
    addBookmark(e) {
        e.preventDefault();
        if (this.state.url.length > 0 && this.state.name.length > 0) {
            const bookmark = {
                url: this.state.url,
                name: this.state.name
            }
			this.props.addBookmark([...this.props.user.bookmarks, bookmark], this.props.user._id, this.props.user);
			this.setState({ name: '', url: '', showBookmarkForm: false });
        } else {
            this.setState({ showBookmarkForm: false })
        }
    }
    hideWidget() {
        // Hide bookmarks widget
        var obj = {
            bookmarks: false,
            calendar: this.props.activeWidgets.calendar,
            crypto: this.props.activeWidgets.crypto,
            clock: this.props.activeWidgets.clock,
            tasks: this.props.activeWidgets.tasks,
			weather: this.props.activeWidgets.weather,
			uploader: this.props.activeWidgets.uploader
        }
        this.props.setWidgets(obj);
    }
    render() {
        const { bookmarks } = this.props.user;
        return (
            <div id="bookmarks" className="widget">
                <div className="delete-widget" onClick={this.hideWidget}><Close /></div>
                {this.state.showBookmarkForm === false ?
                    <div className="header" onClick={this.toggleForm}>
                        <div className="title">
                            Bookmarks
                        </div>
                        <BookmarkIcon />
                    </div>
                    : 
                    <form onSubmit={this.addBookmark}>
                        <TextField
                        className="input"
                        label="Name"
                        onChange={this.handleNameInput}
                        value={this.state.name}
                        />
                        <TextField
                        className = "input"
                        label="Url"
                        onChange={this.handleUrlInput}
                        value={this.state.url}
                        />
                        <Button type="submit" variant="contained" color="secondary">
                            <span>+</span>
                        </Button>
                    </form>
                }
                <div className="url-bookmarks">
                    {/* If there are no bookmarks */}
                    {bookmarks.length === 0 ? <span className="no-bookmarks">No Bookmarks</span> : 
                    bookmarks.map((bookmark, index) => {
                        return (
                            <div key={index} data-id={bookmark.id} className="bookmark">
                                <a href={bookmark.url}>
                                    {bookmark.name}
                                    <img src={`${bookmark.url}/favicon.ico`} alt="LOGO" />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Bookmarks