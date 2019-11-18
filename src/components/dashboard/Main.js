import React, { Component } from 'react';

// SCSS
import '../../scss/Widgets.scss';

// Widgets
import Tasks from './widgets/Tasks';
import Calendar from './widgets/Calendar';
import Bookmarks from './widgets/Bookmarks';
import Weather from './widgets/Weather';
import Clock from './widgets/Clock';
import Crypto from './widgets/Crypto';
import Uploader from './widgets/Uploader';

class Main extends Component {
    render() {
		const {
			user,
			activeWidgets,
			weather,
			forecast,
			setWidgets,
			deleteTask,
			getUserFiles,
			uploadFile,
			deleteFile,
			getWeather,
			getForecast,
			updateNotifications,
			addBookmark
		} = this.props;
        return (
            <div id="widget-grid">
                {Boolean(activeWidgets.tasks) === true ? <Tasks user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} deleteTask={deleteTask} /> : null}
                {Boolean(activeWidgets.calendar) === true ? <Calendar user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} updateNotifications={updateNotifications} /> : null}
                {Boolean(activeWidgets.clock) === true ? <Clock user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} /> : null}
                {Boolean(activeWidgets.weather) === true ? <Weather user={user} activeWidgets={activeWidgets} weather={weather} forecast={forecast} setWidgets={setWidgets} getWeather={getWeather} getForecast={getForecast} /> : null}
                {Boolean(activeWidgets.bookmarks) === true ? <Bookmarks user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} addBookmark={addBookmark} /> : null}
				{Boolean(activeWidgets.crypto) === true ? <Crypto user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} /> : null}
				{Boolean(activeWidgets.uploader) === true ? <Uploader user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} getUserFiles={getUserFiles} uploadFile={uploadFile} deleteFile={deleteFile} /> : null}
            </div>
        )
    }
}

export default Main;