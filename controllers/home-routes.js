const router = require('express').Router();

router.get('/', async (req, res) => {
	res.send('hello from /');
});

module.exports = router;
