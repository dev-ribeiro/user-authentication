const wrapper = document.getElementById('wrapper');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailText = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const updateUserInfo = document.getElementById('updateUserInfo');
const updateUserPassword = document.getElementById('updateUserPassword');
const logout = document.getElementById('logout');
const deleteButton = document.getElementById('deleteButton');
const errorToast = document.getElementById('errorToast');
const successToast = document.getElementById('successToast');

const STORAGE_KEY = '@user-authentication___v1';
const BASE_PATH = 'http://localhost:3335';
const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

onload = () => {
    setProfileData();

    logout.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);

        window.location.href = BASE_PATH;
    })
}

function setProfileData() {
    firstNameInput.setAttribute('value', storageData.firstName);
    lastNameInput.setAttribute('value', storageData.lastName);
    emailText.innerText = storageData.email;
}

updateUserInfo.addEventListener('submit', async (e) => {
    e.preventDefault();

    const getUser = await fetch(`/api/find/${storageData.email}`);
    const { id } = await getUser.json();

    const response = await fetch(`/api/update/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "firstName": firstNameInput.value,
            "lastName": lastNameInput.value
        })
    });

    if (response.status !== 202) {
        bootstrap.Toast.getOrCreateInstance(errorToast).show();
        return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...storageData,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value
    }));

    bootstrap.Toast.getOrCreateInstance(successToast).show();
});

updateUserPassword.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!passwordInput.value || !confirmPasswordInput.value) return bootstrap.Toast.getOrCreateInstance(errorToast).show();

    if (passwordInput.value !== confirmPasswordInput.value) return bootstrap.Toast.getOrCreateInstance(errorToast).show();

    const getUser = await fetch(`/api/find/${storageData.email}`);

    const { id } = await getUser.json();

    try {
        await fetch(`/api/update/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": passwordInput.value
            })
        });

        bootstrap.Toast.getOrCreateInstance(successToast).show();
    } catch (error) {
        bootstrap.Toast.getOrCreateInstance(errorToast).show();
    }

});

deleteButton.addEventListener('click', async () => {
    const getUser = await fetch(`/api/find/${storageData.email}`);

    const { id } = await getUser.json();

    try {
        await fetch(`/api/delete/${id}`, {
            method: 'DELETE'
        });

        window.location.href = BASE_PATH;
    } catch (error) {
        bootstrap.Toast.getOrCreateInstance(errorToast).show();
    }

})
