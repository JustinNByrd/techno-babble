const handleLogin = async function(event) {
	event.preventDefault();

	const usernameEl = document.getElementById('username');
	const passwordEl = document.getElementById('password');

	const res = await fetch('/api/user', {
		method: 'POST',
		body: JSON.stringify({
			username: usernameEl.value,
			password: passwordEl.value
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

document.getElementById('login').addEventListener('submit', handleLogin);