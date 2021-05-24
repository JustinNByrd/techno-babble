const router = require('express').Router();

router.get('/', async (req, res) => {
	res.send('hello from /');
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.get('/login', (req, res) => {
	res.render('login');
});

module.exports = router;
