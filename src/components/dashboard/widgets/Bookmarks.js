import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookmarkIcon from "@material-ui/icons/NoteAdd";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import { bookmarks } from '../widgets/variables/bookmarks';

// SCSS
import '../../../scss/Bookmarks.scss';

class Bookmarks extends Component {
    constructor() {
        super();
        this.state = {
            showBookmarkForm: false,
            name: '',
            url: ''
        }
        this.addBookmark = this.addBookmark.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUrlInput = this.handleUrlInput.bind(this);
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
    }
    render() {
        const { bookmarks } = this.props;
        return (
            <div id="bookmarks" className="widget">
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
                        required
                        onChange={this.handleNameInput}
                        />
                        <TextField
                        className = "input"
                        label="Url"
                        required
                        onChange={this.handleUrlInput}
                        />
                        <Button type="submit" variant="contained" color="secondary">
                            +
                        </Button>
                    </form>
                }
                <div className="url-bookmarks">
                    {/* If there are no bookmarks, display No Bookmarks */}
                    {bookmarks.length === 0 ? 'No Bookmarks' : bookmarks.map((bookmark, index) => {
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

Bookmarks.propTypes = {
    bookmarks: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    bookmarks: state.siteData.bookmarks
});

export default connect(mapStateToProps)(Bookmarks);