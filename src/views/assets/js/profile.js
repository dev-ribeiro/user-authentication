const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailText = document.getElementById('email');
const password = document.getElementById('password');
const logout = document.getElementById('logout');
const confirmPassword = document.getElementById('confirmPassword');
const STORAGE_KEY = '@user-authentication___v1';
const BASE_PATH = 'http://localhost:3335';

onload = () => {
    setProfilePreviusData();

    logout.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);

        window.location.href = BASE_PATH;
    })
}

function setProfilePreviusData() {
    const { firstName, lastName, email } = JSON.parse(localStorage.getItem(STORAGE_KEY));

    firstNameInput.setAttribute('value', firstName);
    lastNameInput.setAttribute('value', lastName);
    emailText.innerText = email;
}
