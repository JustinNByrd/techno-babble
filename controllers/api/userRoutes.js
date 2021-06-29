const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");
const { Store } = require('express-session');

// get all users
router.get('/', async (req, res) => {
	try {
		const userData = await User.findAll();
		res.json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		console.log(req.body);
		const newUser = await User.create(req.body);
		res.status(200).json(newUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const findUser = await User.findOne({ where: { username: req.body.username }});
		if (!findUser) res.sendStatus(400);
		const checkPassword = await bcrypt.compare(req.body.password, findUser.password);
		if (!checkPassword) {
			res.sendStatus(400);
		} else {
			req.session.userName = findUser.username;
			req.session.email = findUser.email;
			req.session.isAuthenticated = 'true';
			res.sendStatus(200);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/logout', async (req, res) => {
	// Store.destroy(req.sessionID, (err) => res.sendStatus(400));
	req.session.destroy((err) => {
		res.sendStatus(200);
	});
});

module.exports = router;