import React, { Component } from 'react';

// Widgets
import Tasks from '../widgets/Tasks';
import Fade from '@material-ui/core/Fade';
import Calendar from '../widgets/Calendar';
import Bookmarks from '../widgets/Bookmarks';
import Weather from '../widgets/Weather';
import Clock from '../widgets/Clock';
import Crypto from '../widgets/Crypto';
import Uploader from '../widgets/Uploader';

class Main extends Component {
    render() {
		const {
			user,
			activeWidgets,
			weather,
			forecast,
			setWidgets,
			updateTasks,
			getUserFiles,
			uploadFile,
			deleteFile,
			getWeather,
			getForecast,
			updateNotifications,
			updateBookmarks,
			toggleMediaModal,
			viewFile,
			currentFile
		} = this.props;
        return (
			<Fade in={true}>
            <div id="widget-grid">
                {Boolean(activeWidgets.tasks) === true ? <Tasks user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} updateTasks={updateTasks} /> : null}
                {Boolean(activeWidgets.calendar) === true ? <Calendar user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} updateNotifications={updateNotifications} /> : null}
                {Boolean(activeWidgets.clock) === true ? <Clock user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} /> : null}
				{Boolean(activeWidgets.uploader) === true ? <Uploader viewFile={viewFile} currentFile={currentFile} toggleMediaModal={toggleMediaModal} user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} getUserFiles={getUserFiles} uploadFile={uploadFile} deleteFile={deleteFile} /> : null}
				{Boolean(activeWidgets.bookmarks) === true ? <Bookmarks user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} updateBookmarks={updateBookmarks} /> : null}
				{Boolean(activeWidgets.weather) === true ? <Weather user={user} activeWidgets={activeWidgets} weather={weather} forecast={forecast} setWidgets={setWidgets} getWeather={getWeather} getForecast={getForecast} /> : null}
				{Boolean(activeWidgets.crypto) === true ? <Crypto user={user} activeWidgets={activeWidgets} setWidgets={setWidgets} /> : null}
            </div>
			</Fade>
        )
    }
}

export default Main;