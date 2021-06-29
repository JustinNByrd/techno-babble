const handleLogin = async function(event) {
	event.preventDefault();

	const usernameEl = document.getElementById('username');
	const passwordEl = document.getElementById('password');

	const res = await fetch('/api/user/login', {
		method: 'POST',
		body: JSON.stringify({
			username: usernameEl.value,
			password: passwordEl.value
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.ok) {
		window.location.replace('/dashboard');
	} else {
		window.alert('User authentication failed.');
	}
}

document.getElementById('login').addEventListener('submit', handleLogin);