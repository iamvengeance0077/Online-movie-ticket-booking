// Login authentication logic for loginPage.html

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.loginbtn');
    const nameInput = document.querySelectorAll('.txt')[0];
    const passwordInput = document.querySelectorAll('.txt')[1];

    // Add a message element for feedback
    let messageElem = document.getElementById('login-message');
    if (!messageElem) {
        messageElem = document.createElement('div');
        messageElem.id = 'login-message';
        messageElem.style.marginTop = '10px';
        messageElem.style.textAlign = 'center';
        loginBtn.parentNode.appendChild(messageElem);
    }

    loginBtn.addEventListener('click', async function(event) {
        event.preventDefault();
        messageElem.textContent = '';
        const name = nameInput.value.trim();
        const password = passwordInput.value.trim();
        if (!name || !password) {
            messageElem.style.color = 'red';
            messageElem.textContent = 'Please enter both name and password.';
            return;
        }
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            });
            const data = await response.json();
            if (response.ok) {
                // Login success, redirect or show success
                window.location.href = 'movies.html';
            } else {
                messageElem.style.color = 'red';
                messageElem.textContent = data.message || 'Login failed.';
            }
        } catch (err) {
            messageElem.style.color = 'red';
            messageElem.textContent = 'Error: ' + err.message;
        }
    });
});
