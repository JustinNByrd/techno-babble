const handleNewComment = async function(event) {
	event.preventDefault();

	const postId = window.location.href.split('/').pop();
	const res = await fetch('/api/post/addComment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			body: document.getElementById('postComment').value,
			postId: postId
		}),
	});

	if (res.ok) {
		window.location.replace('/dashboard');
	} else {
		window.alert('New comment failed.');
	}
}

let newCommentSubmitEl = document.getElementById("newCommentSubmit");
newCommentSubmitEl.addEventListener("click", handleNewComment);