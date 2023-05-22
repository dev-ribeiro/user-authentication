const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const BASE_URL = 'http://localhost:3335';
const STORAGE_KEY = '@user-authentication___v1';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateUserLogin(email.value, password.value);
});

async function validateUserLogin(email, password) {
    try {
        const response = await fetch(`/api/login/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();

        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        }));

        window.location.href = `${BASE_URL}/profile`;
    } catch (error) {
        console.log(error);
        window.location.href = `${BASE_URL}/error`;
    }
}
