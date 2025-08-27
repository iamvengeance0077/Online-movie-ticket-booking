// register.js: Handles registration form submission and sends data to backend

document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signupBtn');
    const nameInput = document.getElementById('regName');
    const passwordInput = document.getElementById('regPassword');

    // Add a message element for feedback
    let messageElem = document.getElementById('register-message');
    if (!messageElem) {
        messageElem = document.createElement('div');
        messageElem.id = 'register-message';
        messageElem.style.marginTop = '10px';
        messageElem.style.textAlign = 'center';
        messageElem.style.color = 'green';
        signupBtn.parentNode.appendChild(messageElem);
    }

    signupBtn.addEventListener('click', async function(event) {
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
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            });
            const data = await response.json();
            if (response.ok) {
                messageElem.style.color = 'green';
                messageElem.textContent = 'User registered successfully!';
                nameInput.value = '';
                passwordInput.value = '';
            } else {
                messageElem.style.color = 'red';
                messageElem.textContent = data.message || 'Registration failed.';
            }
        } catch (err) {
            messageElem.style.color = 'red';
            messageElem.textContent = 'Error: ' + err.message;
        }
    });
});
