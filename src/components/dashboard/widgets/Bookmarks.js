import React, { Component } from 'react';
import NoteAdd from "@material-ui/icons/NoteAdd";
import Delete from "@material-ui/icons/Delete";

import { bookmarksData } from '../widgets/variables/bookmarks';

// SCSS
import '../../../scss/Bookmarks.scss';

class Bookmarks extends Component {
    deleteBookmark(e) {
        return e.target.parentElement.dataset.id;
    }
    render() {
        return (
            <div id="bookmarks" className="widget">
                <div className="header">
                    <div className="title">
                        Bookmarks
                    </div>
                    <NoteAdd />
                </div>
                <div className="url-bookmarks">
                    {bookmarksData.map((bookmark, index) => {
                        return (
                            <div key={index} data-id={bookmark.id} className="bookmark">
                                <a href={bookmark.url}>{bookmark.name}</a>
                                <Delete data-id={bookmark.id} onClick={this.deleteBookmark} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Bookmarks;