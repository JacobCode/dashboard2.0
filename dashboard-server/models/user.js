const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	// Users Info
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	// Email Verified
	confirmed: {
		type: Boolean,
		required: true,
		default: false
	},
	// Users Notifications
	notifications: {
		type: Array,
		required: true
	},
	// Users Bookmarks
	bookmarks: {
		type: Array,
		required: true
	},
	// Users Tasks
	bugsData: {
		type: Array,
		required: true
	},
	websiteData: {
		type: Array,
		required: true
	},
	serverData: {
		type: Array,
		required: true
	},
	// User Files
	files: {
		type: Array,
		required: true
	}
})

module.exports = User = mongoose.model('user', UserSchema);