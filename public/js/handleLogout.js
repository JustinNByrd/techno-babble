const handleLogout = async function(event) {
	event.preventDefault();

	const res = await fetch('/api/user/logout', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.ok) {
		window.location.replace('/');
	} else {
		window.alert('Logout failed.');
	}
}

document.getElementById("logOutButton").addEventListener("click", handleLogout);