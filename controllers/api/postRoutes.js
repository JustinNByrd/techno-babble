const router = require('express').Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

router.post('/addPost', async (req, res) => {
	try {
		postData = {
			user_id: req.session.userId,
			title: req.body.postTitle,
			body: req.body.postBody
		};
		const newPost = await Post.create(postData);
		res.status(200).json(newPost);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.post('/addComment', async (req, res) => {
	try {
		req.body.userId = req.session.userId;
		const newComment = await Comment.create(req.body);
		res.status(200).json(newComment);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
