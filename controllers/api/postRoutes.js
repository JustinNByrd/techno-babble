const router = require('express').Router();
const Post = require('../../models/Post');

router.post('/addPost', async (req, res) => {
	try {
		postData = {
			user_id: req.session.userId,
			title: req.body.postTitle,
			body: req.body.postBody
		};
		const newPost = await Post.create(postData);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
