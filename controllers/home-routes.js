const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
	const posts = await sequelize.query(`select a.id, a.title, a.body, b.username from post a, user b where a.user_id = b.id`, { type: QueryTypes.SELECT });
	res.render('home', { layout: 'main', isAuthorized: req.session.isAuthenticated, posts: posts});
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.get('/login', (req, res) => {
	res.render('login', { layout: 'main', isAuthorized: req.session.isAuthenticated});
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

router.get('/post/:id', async (req, res) => {
	try {
		const post = await sequelize.query(`select a.title, a.body, b.username from post a, user b where a.user_id = b.id and a.id = ${req.params.id}`,  { type: QueryTypes.SELECT });
		const comments = await sequelize.query(`select a.body, b.username from comments a, user b where a.userId = b.id and postId = ${req.params.id}`, { type: QueryTypes.SELECT });
		res.render('post', {layout: 'mainPost', isAuthorized: req.session.isAuthenticated, post: post[0], comments: comments});
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get('/addPost', (req, res) => {
	res.render('addPost', { layout: 'authorized', isAuthorized: req.session.isAuthenticated })
});

module.exports = router;
