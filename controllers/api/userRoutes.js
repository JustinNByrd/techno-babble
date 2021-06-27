const router = require('express').Router();
const { User } = require('../../models');
const passport = require('passport');

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

router.post('/login', async (req, res, next) => {
	try {
		passport.authenticate('local', {
			successRedirect: '/dashboard',
			failureRedirect: '/login',
		})(req, res, next);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;