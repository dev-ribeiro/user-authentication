const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');

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

    const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            password
        },
        body: JSON.stringify({ "user": user })
    })

    console.log(response);
}
