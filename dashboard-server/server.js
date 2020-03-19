const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');

// Email address template to send to user
const verifyEmailAddress = require('./verifyEmailAddress');

// Forgot password email
const forgotPasswordEmail = require('./forgotPasswordEmail');

// Express Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
app.disable('x-powered-by');
app.enable("trust proxy");
app.set('view engine', 'ejs');

// DB Models
const User = require('./models/user');
// DB Config
const db = process.env.MONGODB_URI;
// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useFindAndModify: false })
    .then(() => { console.log('✅ MONGO DB CONNECTED')})
	.catch(() => { console.log('🛑 MONGO DB ERROR')});
	
// Init gfs (file manage)
const conn = mongoose.createConnection(db, { useNewUrlParser: true })
let gfs;
conn.once('open', () => {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('uploads');
});

// Setup rate limit
/**
 * @param  {number} maxAttempts
 * @param  {number} minutes
 */
var setupLimit = (maxAttempts, minutes) => {
	return rateLimit({
		windowMs: 60000 * minutes,
		max: maxAttempts
	});
}

// Create storage
const storage = new GridFsStorage({
	url: db,
	uploadedBy: '',
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				// Set File Info
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					fileName: filename,
					metadata: {
						uploadedBy: { uploadedBy } = storage.configuration.uploadedBy,
						name: file.originalname.trim()
					},
					bucketName: 'uploads'
				};
				resolve(fileInfo);
			});
		});
	}
});
const upload = multer({ storage });
	
// Verify Token
const verifyToken = (req, res, next) => {
	// Get auth Header
	const bearerHeader = req.headers['authorization'];
	if (typeof (bearerHeader) !== undefined) {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

// Async func to send email with token
async function sendEmail(func, token, email, msg, txt) {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		// change to node_variables
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	const info = await transporter.sendMail({
		from: `"Test Verification" <${'testverify1234567@gmail.com'}>`, // sender address
		to: email, // receiver email
		subject: msg, // Subject line
		text: txt, // plain text body
		html: func(token, email) // html email template
	});
}

// Verify Email (GET)
app.get('/verify/:token', setupLimit(1, 60), (req, res) => {
	jwt.verify(req.params.token, 'secretKey', (err, authData) => {
		if (err) {
			res.send('Authorization Expired');
		} else {
			// Update user confirmation to true
			User.findByIdAndUpdate(authData.user._id, {
				confirmed: true
			}, (error) => {
				if (error) console.log(error);
			})
			.then((data) => res.send('Account verified, you may now login'))
			.catch((err) => res.send('Error verifying account, please try again'));
		}
	})
})

// New User (POST)
app.post('/account/register', setupLimit(2, 60), verifyToken, (req, res) => {
	const { first_name, last_name, email } = req.body;
	const hashPassword = async () => {
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.password, salt);
		return password;
	}
	hashPassword().then((pswd) => {
		var newUser = new User({
			first_name: first_name.toString(),
			last_name: last_name.toString(),
			email: email.toString().toLowerCase(),
			password: pswd,
			notifications: [],
			bookmarks: [],
			bugsData: [],
			websiteData: [],
			serverData: [],
			files: []
		});
		newUser.save()
			.then((user) => {
				// Key Expiration
				const keyExpiration = '1h';
				// JWT Authentication
				jwt.sign({user: user}, 'secretKey', { expiresIn: keyExpiration }, (err, token) => {
					sendEmail(verifyEmailAddress, token, email.toLowerCase(), 'Dashboard Account Verification', 'Confirm Your Account')
						.then(() => {
							res.status(200).send({ message: 'Account created, please check your email to verify your account' });
						})
						.catch((err) => console.log(err));
				});
			})
			.catch((err) => {
				console.log(err);
				// If duplicate values for email
				if (err.code === 11000) {
					res.status(201).send({error: 'Email already in use'});
				}
			});
	});
});

// Login User (POST)
app.post('/account/login', setupLimit(10, 60), (req, res) => {
	// If using guest account
	if (req.body.email.toString().toLowerCase() === 'guestuser@ethereal.email') {
		const resetData = {
			notifications: [],
			bookmarks: [],
			bugsData: [],
			websiteData: [],
			serverData: [],
			files: []
		}
		User.findByIdAndUpdate('5ddc58175ff659042ad5df3f', resetData, (error) => {
			if (error) console.log(error, 'Error');
		})
		.then((guestUserInfo) => {
			res.json(guestUserInfo);
		});
	} else {
		User.find({ email: req.body.email.toString().toLowerCase() })
			.then((results) => {
				// Compare passwords
				const comparePasswords = async (text, hash) => {
					const isMatch = await bcrypt.compare(text, hash);
					// If passwords match
					if (isMatch) {
						// If account is confirmed
						if (results[0].confirmed === true) {
							res.json(results[0]);
						} else {
							res.status(201).send({error: 'Please verify your account'})
						}
					} else {
						res.status(201).send({error: 'Wrong login info'});
					}
				}
				comparePasswords(req.body.password, results[0].password);
			})
			.catch((err) => {
				res.status(201).send({error: 'Wrong login info'});
			});
	}
});

// Add New Notification (POST)
app.post('/user/:id/notifications', setupLimit(50, 60), (req, res) => {
	User.findByIdAndUpdate(req.params.id, { notifications: req.body.notifications }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.notifications);
	});
});

// Update Bookmarks (POST)
app.post('/user/:id/bookmarks', setupLimit(50, 60), (req, res) => {
	User.findByIdAndUpdate(req.params.id, { bookmarks: req.body.bookmarks }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.bookmarks);
	});
});

// Update Bug Tasks (POST)
app.post('/user/:id/bugs', setupLimit(50, 60), (req, res) => {
	User.findByIdAndUpdate(req.params.id, { bugsData: req.body.tasks }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.tasks);
	});
});

// Update Website Tasks (POST)
app.post('/user/:id/website', setupLimit(50, 60), (req, res) => {
	User.findByIdAndUpdate(req.params.id, { websiteData: req.body.tasks }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.tasks);
	});
});

// Update Server Tasks (POST)
app.post('/user/:id/server', setupLimit(50, 60), (req, res) => {
	User.findByIdAndUpdate(req.params.id, { serverData: req.body.tasks }, (error) => {
		if (error) console.log(error, 'Error');
		res.status(200).send(req.body.tasks);
	});
});

// Get user (GET)
app.get('/user/:userId', setupLimit(50, 60), (req, res) => {
	User.findById(req.params.userId)
		.then((data) => {
			res.json(data);
		}).catch((err) => console.log(err));
});

// Change Password (POST) (VIA Profile Settings Page)
app.post('/user/changepassword', setupLimit(5, 60), (req, res) => {
	if (req.body.id === '5ddc58175ff659042ad5df3f') {
		res.status(404).send("Can't change guest password!");
	} else {
		User.find({ _id: req.body.id })
			.then((results) => {
				// Compare passwords
				const comparePasswords = async (text, hash) => {
					const isMatch = await bcrypt.compare(text, hash);
					// If passwords match
					if (isMatch) {
						const hashPassword = async () => {
							const salt = await bcrypt.genSalt(10);
							const password = await bcrypt.hash(req.body.new, salt);
							return password;
						}
						hashPassword().then((pswd) => {
							// Update password
							User.findByIdAndUpdate(req.body.id, { password: pswd }, (error) => {
								if (error) { console.log(error) }
								else { res.status(200).send(`New Password: ${req.body.new}`) }
							});
						});
					} else { res.status(404).send('Incorrect Password') }
				}
				comparePasswords(req.body.old, results[0].password);
			})
			.catch((err) => res.status(404).send('User does not exist'));
	}
});

// Forgot Password (VIA Home Page) (POST)
app.post('/user/forgotpassword', setupLimit(4, 30), (req, res) => {
	if (req.body.email === 'guestuser@ethereal.email') {
		res.status(404).send("Can't change guest password!");
	} else {
		User.findOne({ email: req.body.email.toString().toLowerCase() })
			.then((user) => {
				if (user !== null) {
					// Key Expiration
					const keyExpiration = 60;
					// JWT Authentication
					jwt.sign({ user: user }, 'pskey', { expiresIn: keyExpiration }, (err, token) => {
						sendEmail(forgotPasswordEmail, token, req.body.email.toLowerCase(), 'Change Password Request', "Change your account's password")
							.then(() => {
								res.status(200).send({ message: 'Password recovery email has been sent' });
							})
							.catch((err) => console.log(err));
					});
				} else {
					res.status(404).send({error: 'User not found'});
				}
			})
			.catch(() => {
				res.status(404).send({error: 'User not found'});
			})
	}
});

// Show form for user to enter their new password if token is valid (GET)
app.get('/changepassword/:token/:email', setupLimit(1, 30), (req, res) => {
	jwt.verify(req.params.token, 'pskey', (err, authData) => {
		if (err) {
			res.send('Authorization Expired');
		} else {
			app.locals.token = req.params.token;
			app.locals.email = req.params.email;
			res.render('./changePassword');
		}
	})
});

// Update the user's new password from the ejs form (POST)
app.post('/updatepassword', setupLimit(1, 30), (req, res) => {
	let { token, newPassword, email } = req.body;
	const hashPassword = async () => {
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(newPassword, salt);
		return password;
	}
	jwt.verify(token, 'pskey', (err, authData) => {
		if (err) {
			res.send('Authorization Expired');
		} else {
			hashPassword().then((pswd) => {
				// Update password
				User.findOneAndUpdate({ email: email }, { password: pswd }, (error) => {
					if (error) { console.log(error) }
					else { res.status(200).send(`Password Successfully Changed`) }
				});
			});
		}
	});
});

// Delete account (DELETE)
app.delete('/account/delete/:userId/:password', (req, res) => {
	// If trying to delete guest account
	if (req.params.userId === '5ddc58175ff659042ad5df3f') {
		res.status(404).send("Can't delete guest account!");
	} else {
		User.find({ _id: req.params.userId })
			.then((results) => {
				// Compare passwords
				const comparePasswords = async (text, hash) => {
					const isMatch = await bcrypt.compare(text, hash);
					// If passwords match
					if (isMatch) {
						const hashPassword = async () => {
							const salt = await bcrypt.genSalt(10);
							const password = await bcrypt.hash(req.params.password, salt);
							return password;
						}
						hashPassword().then((pswd) => {
							// Find account by id and delete
							User.findByIdAndDelete({ _id: req.params.userId })
								// Redirect OK on account delete
								.then((response) => res.status(200).send('Deleted Account :('))
								.catch((err) => console.log(err));
						});
					} else { res.status(404).send('Incorrect Password') }
				}
				comparePasswords(req.params.password, results[0].password);
				return results;
			})
			.then((dt) => {
				// For each user file, delete file from 'Uploads'
				dt[0].files.forEach((file) => {
					gfs.remove({ _id: file._id, root: 'uploads' }, (err, gridStore) => {
						if (err) return res.status(404).json({ error: err });
					});
				});
			})
			.catch((err) => res.status(404).send('Wrong password, please try again'));
	}
});

// Upload files to db (POST)
app.post('/user/files/upload', upload.single('file'), (req, res) => {
	if (req.file !== undefined) {
		gfs.files.find().toArray((err, files) => {
			// If no files
			if (files.length === 0) {
				return res.status(201).json({
					err: 'No files exist'
				});
			}
			// Update file metadata
			var result = Object.keys(files).map((key) => {
				return files[key];
			});
			for (var i = 0; i < Object.keys(result).length; i++) {
				if (files[`${i}`]._id.toString() == req.file.id.toString()) {
					files[`${i}`].metadata.uploadedBy = req.body.id;
					files[`${i}`].metadata.name = req.body.name + path.extname(req.file.originalname);
				}
			}
			// Find which user is uploading a file
			User.findById(req.body.id, (err, dt) => {
				if (err) console.log(err);
				for (var i = 0; i < files.length; i++) {
					if (dt !== null) {
						if (files[i].metadata.uploadedBy.toString() === dt._id.toString()) {
							// Set array
							var arr = [];
							// Push users current files to array
							dt.files.forEach((f) => {
								arr.push(f);
							})
							// Add new file to users current files
							const output = [...arr, files.filter((f) => f.metadata.uploadedBy === req.body.id)[0]];
							// Update and save users files
							User.findByIdAndUpdate(req.body.id, { files: output }, (error) => {
								if (error) console.log(error);
							})
								.then((data) => {
									// Send 'ok' and data
									res.status(200).send({user: data});
								});
						}
					} else {
						res.status(201).send('There was a problem');
					}
				}
			});
		});
	}
});

// Get user's files (GET)
app.get('/user/files/:userId', (req, res) => {
	User.findById(req.params.userId)
		.then((data) => {
			res.status(200).send(data.files);
		}).catch((err) => res.send({err: err}));
});

// Delete File (DELETE)
app.delete('/user/files/delete/:fileId/:userId', (req, res) => {
	gfs.remove({ _id: req.params.fileId, root: 'uploads' }, (err, gridStore) => {
		if (err) return res.status(404).json({ error: err });
		res.status(200).send(`Deleted ${req.params.fileId}`);
		User.findById(req.params.userId)
			.then((data) => {
				User.findByIdAndUpdate(req.params.userId, { files: data.files.filter((file) => file._id.toString() !== req.params.fileId) }, (error) => {
					if (error) console.log(error);
				});
			})
	});
});

// Download File (GET)
app.get('/user/files/download/:filename', (req, res) => {
	gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
		// If file does not exist
		if (!files || files.length === 0) {
			return res.status(404).json({ message: 'error' });
		}
		// Create read stream
		var readstream = gfs.createReadStream({
			filename: files[0].filename,
			root: 'uploads'
		});
		// set the proper content type 
		res.set('Content-Disposition', `attachment; filename="${files[0].metadata.name}"`);
		res.set('Content-Type', files[0].contentType);
		// Return response
		return readstream.pipe(res);
	});
});

// Preview File (GET) (Images & MPEG)
app.get('/user/files/preview/:filename', (req, res) => {
	gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
		// If file does not exist
		if (!files || files.length === 0) {
			return res.status(404).json({ message: 'error' });
		}
		// if file is image or audio, return and set content
		if (/[\/.](gif|jpg|jpeg|png)$/.test(files[0].contentType)) {
			const readstream = gfs.createReadStream(files[0].filename);
			readstream.pipe(res);
		} else if(files[0].contentType === 'audio/mpeg') {
			const readstream = gfs.createReadStream(files[0].filename);
			res.type('audio/mpeg');
			readstream.pipe(res);
		} else if (files[0].contentType === 'audio/mp3') {
			const readstream = gfs.createReadStream(files[0].filename);
			res.type('audio/mp3');
			readstream.pipe(res);
		} else {
			res.status(404).json({ error: 'Not an image or audio' });
		}
	});
});

app.listen(process.env.PORT || 3001, () => console.log('\x1b[32m', `Server running on port ${process.env.PORT|| 3001}`));