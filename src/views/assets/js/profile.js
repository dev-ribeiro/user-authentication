const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailText = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const STORAGE_KEY = "@user-authentication___v1";

onload = () => {
    setProfilePreviusData();
}

function setProfilePreviusData() {
    const { firstName, lastName, email } = JSON.parse(localStorage.getItem(STORAGE_KEY));

    firstNameInput.setAttribute('value', firstName);
    lastNameInput.setAttribute('value', lastName);
    emailText.innerText = email;
}
