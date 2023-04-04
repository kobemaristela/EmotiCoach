let submit = document.getElementById("submit");
let csrfToken = document.cookie.split(';');
for (let i=0; i<csrfToken.length; i++) {
    if (csrfToken[i].includes("csrftoken=")){
        csrfToken = csrfToken[i].replace("csrftoken=", "")
    }
}

const register = async(e) => {
    e.preventDefault();
    firstName = document.getElementById("firstName");
    lastName = document.getElementById("lastName");
    username = document.getElementById("username");
    email = document.getElementById("email");
    password = document.getElementById("password");
    repeatPassword = document.getElementById("repeatPassword");

    if (password.value != repeatPassword.value) {
        alert("Password does not match.");
        return true;
    }

    const addData = new FormData();

    addData.append("first_name", firstName.value);
    addData.append("last_name", lastName.value);
    addData.append("username", username.value);
    addData.append("email", email.value);
    addData.append("password", password.value);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };
    const res = await fetch(window.location.origin + '/user/register', tableParam);
    let sessionInfo = await res.json();
    
    if (sessionInfo["response"] == "success") {
        window.location.replace("/webapp");
    }
    else {
        alert(sessionInfo["response"]);
    }
}



submit.addEventListener('click', register);