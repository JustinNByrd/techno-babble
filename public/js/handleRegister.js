const handleRegister = async function(event) {
	event.preventDefault();

	const emailAddressEl = document.getElementById('email');
	const usernameEl = document.getElementById('username');
	const passwordEl = document.getElementById('password');

	const res = await fetch('/api/user', {
		method: 'POST',
		body: JSON.stringify({
			email: emailAddressEl.value,
			username: usernameEl.value,
			password: passwordEl.value
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.ok) {
		window.location.replace('/login');
	}
	else {
		alert('oops');
	}
}

document.getElementById('register').addEventListener('submit', handleRegister);