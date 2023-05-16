const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const BASE_URL = "http://localhost:3335";
const STORAGE_KEY = "@user-authentication___v1";

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateUserLogin(email.value, password.value);
});

async function validateUserLogin(email, password) {
    const response = await fetch(`/api/login/${email}`, {
        method: 'POST',
        headers: {
            password
        }
    });

    if (response.status !== 200) {
        window.location.href = `${BASE_URL}/error`;
        return;
    }

    const data = await response.json();

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
    }));

    window.location.href = `${BASE_URL}/profile`;
}
