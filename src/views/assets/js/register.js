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
    };

    const userPassword = password.value;

    registerUser(register, userPassword);
});

async function registerUser(user, password) {
    try {
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                password
            },
            body: JSON.stringify({ "user": user })
        });

        console.log(response);

        if (response.status !== 201) {
            throw new Error();
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...user }));

        window.location.href = `${BASE_URL}/profile`
    } catch (error) {
        bootstrap.Toast.getOrCreateInstance(errorToast).show();
    }

}
