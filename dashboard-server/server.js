const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Express Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.disable('x-powered-by');
app.enable("trust proxy");

// DB Models
const User = require('./models/user');

// DB Config
const db = 'mongodb://jacob:jacob123@ds261486.mlab.com:61486/m-dashboard';

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true })
    .then(() => { console.log('✅ MONGO DB CONNECTED')})
    .catch(() => { console.log('🛑 MONGO DB ERROR')});

// // Register
// app.post('/register', setupLimit(3, 30), (req, res) => {
// 	if (req.body.email && req.body.username && req.body.password) {
// 		const hashPassword = async () => {
// 			const salt = await bcrypt.genSalt(10);
// 			const password = await bcrypt.hash(req.body.password, salt);
// 			return password;
// 		}
// 		hashPassword().then((pswd) => {
// 			var newUser = new User({
// 				email: req.body.email.toLowerCase(),
// 				username: req.body.username.toLowerCase(),
// 				password: pswd,
// 			});
// 			newUser.save()
// 				.then((user) => {
// 					res.status(200).send({ message: 'New user registered' })
// 				})
// 				.catch((err) => {
// 					// If duplicate values for email or username
// 					if (err.code === 11000) {
// 						// Return duplicate string from mongo errmsg (email or username)
// 						res.status(201).send(`${err.errmsg.split(/"(.*?)"/g)[1].split('').filter(l => l === '@').length > 0 ? 'Email' : 'Username'} "${err.errmsg.split(/"(.*?)"/g)[1]}" Already Taken`);
// 					}
// 				});
// 		});
// 	} else {
// 		res.status(201).send('Username or Email already taken');
// 	}
// });

// // Change Password
// app.post('/user/changepassword', setupLimit(1, 0.05), (req, res) => {
// 	User.find({ _id: req.body.id })
// 		.then((results) => {
// 			// Compare passwords
// 			const comparePasswords = async (text, hash) => {
// 				const isMatch = await bcrypt.compare(text, hash);
// 				// If passwords match
// 				if (isMatch) {
// 					const hashPassword = async () => {
// 						const salt = await bcrypt.genSalt(10);
// 						const password = await bcrypt.hash(req.body.new, salt);
// 						return password;
// 					}
// 					hashPassword().then((pswd) => {
// 						// Update and save users files
// 						User.findByIdAndUpdate(req.body.id, { password: pswd }, (error) => {
// 							if (error) { console.log(error) }
// 							else { res.status(200).send(`New Password: ${req.body.new}`) }
// 						});
// 					});
// 				} else { res.status(404).send('Incorrect Password') }
// 			}
// 			comparePasswords(req.body.old, results[0].password);
// 		})
// 		.catch((err) => res.status(404).send('User does not exist'));
// });

// Get user ✅
app.get('/user/:userId', (req, res) => {
	User.findById(req.params.userId)
		.then((data) => {
			res.json(data);
		}).catch((err) => console.log(err));
});

// New User ✅
app.post('/register', (req, res) => {
	const hashPassword = async () => {
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.password, salt);
		return password;
	}
	hashPassword().then((pswd) => {
		var newUser = new User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			username: req.body.username,
			password: pswd,
			notifications: [],
			bookmarks: [],
			bugsData: [],
			websiteData: [],
			serverData: []
		});
		newUser.save()
			.then((user) => {
				res.status(200).send({
					message: 'New user registered'
				})
			})
			.catch((err) => {
				// If duplicate values for email or username
				if (err.code === 11000) {
					// Return duplicate string from mongo errmsg (email or username)
					res.status(201).send(`${err.errmsg.split(/"(.*?)"/g)[1].split('').filter(l => l === '@').length > 0 ? 'Email' : 'Username'} "${err.errmsg.split(/"(.*?)"/g)[1]}" Already Taken`);
				}
			});
	});
});

// Login User
app.post('/login', (req, res) => {
	User.find({ username: req.body.username })
		.then((results) => {
			// Compare passwords
			const comparePasswords = async (text, hash) => {
				const isMatch = await bcrypt.compare(text, hash);
				// If passwords match
				if (isMatch) {
					res.json(results[0]);
				} else {
					res.status(201).send('Wrong Login Info');
				}
			}
			comparePasswords(req.body.password, results[0].password);
		})
		.catch((err) => {
			res.status(200).send('Wrong Login Info');
		});
});

// ----------------------------------------------------

// Add New Notification ✅
app.post('/user/:id/notifications', (req, res) => {
	User.findByIdAndUpdate(req.params.id, { notifications: req.body.notifications }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.notifications);
	});
});

// Update Bookmarks ✅
app.post('/user/:id/bookmarks', (req, res) => {
	User.findByIdAndUpdate(req.params.id, { bookmarks: req.body.bookmarks }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.bookmarks);
	});
});

// Update Bug Tasks ✅
app.post('/user/:id/bugs', (req, res) => {
	User.findByIdAndUpdate(req.params.id, { bugsData: req.body.tasks }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.tasks);
	});
});

// Update Website Tasks ✅
app.post('/user/:id/website', (req, res) => {
	User.findByIdAndUpdate(req.params.id, { websiteData: req.body.tasks }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.tasks);
	});
});

// Update Server Tasks ✅
app.post('/user/:id/server', (req, res) => {
	User.findByIdAndUpdate(req.params.id, { serverData: req.body.tasks }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.tasks);
	});
})

// Delete account from 'Users'
app.post('/user/delete', (req, res) => {
	
});

app.listen(process.env.PORT || 3001, () => console.log('\x1b[32m', `Server running on port ${process.env.PORT|| 3001}`));