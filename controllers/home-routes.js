const router = require('express').Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
	res.send('hello from /');
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/dashboard', async (req, res) => {
	try {
		const userPosts = await Post.findAll({where: {user_id: req.session.userId}});
		const posts = userPosts.map((post) => post.get({ plain: true}));
		// const postsFormatted = posts.map((post) => {
		// 	let formatCreatedDate = new Date(post.createdAt);
		// 	formatCreatedDate = formatCreatedDate.toLocaleDateString('en-US');
		// 	let formatModifiedDate = new Date(post.updatedAt);
		// 	formatModifiedDate = formatModifiedDate.toLocaleDateString('en-US');
		// 	return {
		// 		id: post.id,
		// 		title: post.title,
		// 		body: post.body,
		// 		user_id: post.user_id,
		// 		createdAt: formatCreatedDate,
		// 		updatedAt: formatModifiedDate
		// 	};
		// });
		res.render('dashboard', { layout: 'authorized', isAuthorized: req.session.isAuthenticated, posts: posts });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get('/dashboardPost/:id', async (req, res) => {
	try {
		const post = await Post.findOne({where: {id: req.params.id}});
		const formattedPost = post.get({plain: true});
		res.render('dashboardPost', { layout: 'authorizedPost', isAuthorized: req.session.isAuthenticated, post: formattedPost});
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get('/addPost', (req, res) => {
	res.render('addPost', { layout: 'authorized', isAuthorized: req.session.isAuthenticated })
});

module.exports = router;
