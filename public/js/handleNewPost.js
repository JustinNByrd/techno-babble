const handleNewPost = async function(event) {
	event.preventDefault();

	const res = await fetch('/api/post/addPost', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			postTitle: document.getElementById('postTitle').value,
			postBody: document.getElementById('newPost').value,
		}),
	});

	if (res.ok) {
		window.location.replace('/dashboard');
	} else {
		window.alert('New post failed.');
	}
}

let logOutButtonEl = document.getElementById("newPostSubmit");
logOutButtonEl.addEventListener("click", handleNewPost);