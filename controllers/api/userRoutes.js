const router = require('express').Router();
const { User } = require('../../models');

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
		console.log(req.body);
	
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;