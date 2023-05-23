const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorToast = document.getElementById('errorToast');

const BASE_URL = 'http://localhost:3335';
const STORAGE_KEY = '@user-authentication___v1';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const register = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    };

    registerUser(register);
});

async function registerUser(user) {
    try {
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "user": user })
        });

        if (response.status !== 201) {
            throw new Error();
        }

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }));

        window.location.href = `${BASE_URL}/profile`
    } catch (error) {
        bootstrap.Toast.getOrCreateInstance(errorToast).show();
    }

}
