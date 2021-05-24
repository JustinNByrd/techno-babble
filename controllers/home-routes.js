const router = require('express').Router();

router.get('/', async (req, res) => {
	res.send('hello from /');
});

router.get('/register', (req, res) => {
	res.render('register');
});

module.exports = router;
