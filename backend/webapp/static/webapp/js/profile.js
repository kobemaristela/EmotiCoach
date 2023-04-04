csrfToken = document.cookie.split(';');
for (let i=0; i<csrfToken.length; i++) {
    if (csrfToken[i].includes("csrftoken=")){
        csrfToken = csrfToken[i].replace("csrftoken=", "")
    }
}

const editProfile = async() => {
    firstName = document.getElementById("firstName");
    lastName = document.getElementById("lastName");
    email = document.getElementById("email");

    const addData = new FormData();

    addData.append("first_name", firstName.value);
    addData.append("last_name", lastName.value);
    addData.append("email", email.value);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };
    const res = await fetch(window.location.origin + '/user/edit', tableParam);

    location.reload();
}

const changePassword = async() => {
    newPassword = document.getElementById("newPassword");
    repeatPassword = document.getElementById("repeatPassword");

    if (newPassword.value != repeatPassword.value) {
        alert("Password does not match.");
        return true;
    }

    const addData = new FormData();

    addData.append("password", newPassword.value);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };
    const res = await fetch(window.location.origin + '/user/edit', tableParam);
    alert("Password Changed.");
}

const deleteAccount = async() => {
    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 }
    };

    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
        const res = await fetch(window.location.origin + '/user/delete', tableParam);
        window.location.replace("/webapp/login");
    }
}


let submit = document.getElementById("submit");
let passwordSubmit = document.getElementById("passwordSubmit")
let deleteSubmit = document.getElementById("deleteSubmit");

if (submit) {
    submit.addEventListener('click', editProfile);
}
if (passwordSubmit) {
    passwordSubmit.addEventListener('click', changePassword);
}
if (deleteSubmit) {
    deleteSubmit.addEventListener('click', deleteAccount);
}