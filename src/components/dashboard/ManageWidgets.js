import React, { Component } from 'react';

// Material UI
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import '../../scss/ManageWidgets.scss';

const widgets = ['tasks', 'clock', 'crypto', 'calendar', 'bookmarks', 'weather', 'uploader'];

class ManageWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.activeWidgets.tasks,
            clock: props.activeWidgets.clock,
            crypto: props.activeWidgets.crypto,
            calendar: props.activeWidgets.calendar,
            bookmarks: props.activeWidgets.bookmarks,
			weather: props.activeWidgets.weather,
			uploader: props.activeWidgets.uploader
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.updateWidgets = this.updateWidgets.bind(this);
    }
    handleToggle(e, widget) {
        switch (widget) {
            case 'tasks':
                this.setState({ tasks: !this.state.tasks });
                break;
            case 'clock':
                this.setState({ clock: !this.state.clock });
                break;
            case 'crypto':
                this.setState({ crypto: !this.state.crypto });
                break;
            case 'calendar':
                this.setState({ calendar: !this.state.calendar });
                break;
            case 'bookmarks':
                this.setState({ bookmarks: !this.state.bookmarks });
                break;
            case 'weather':
                this.setState({ weather: !this.state.weather });
				break;
			case 'uploader':
				this.setState({ uploader: !this.state.uploader });
				break;
            default: 
                break;
        }
    }
    updateWidgets() {
        var activeWidgets = {
            tasks: this.state.tasks,
            clock: this.state.clock,
            crypto: this.state.crypto,
            calendar: this.state.calendar,
            bookmarks: this.state.bookmarks,
			weather: this.state.weather,
			uploader: this.state.uploader
        }
        this.props.setWidgets(activeWidgets);
    }
    render() {
        const { tasks, clock, crypto, calendar, bookmarks, weather, uploader } = this.state;
        return (
            <div id="manage-widgets">
                <h1 className="title">Manage Widgets</h1>
                <div className="content">
                    <div className="widgets">
                        {widgets.map((widget) => {
                            return (
                                <div key={widget} className={`widget ${widget}`}>
                                    <h1>{widget}</h1>
                                    <Switch
                                    checked={
                                        widget === 'tasks' ? tasks : 
                                        widget === 'clock' ? clock : 
                                        widget === 'crypto' ? crypto : 
                                        widget === 'calendar' ? calendar : 
                                        widget === 'bookmarks' ? bookmarks : 
                                        widget === 'weather' ? weather :
										widget === 'uploader' ? uploader : null
                                    }
                                    onChange={e => this.handleToggle(e, widget)}
                                    color="primary"
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <Button onClick={this.updateWidgets} variant="contained" color="primary">
                        Update Widgets
                    </Button>
                </div>
            </div>
        )
    }
}

export default ManageWidgets;