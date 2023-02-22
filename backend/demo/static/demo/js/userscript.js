let loginbutton = document.getElementById("loginbutton");
let registerbutton = document.getElementById("registerbutton");
let loginregistersubmit = document.getElementById("loginregistersubmit");

const displayRegisterForm = (e) => {
    registerbutton.classList.add("selected");
    loginbutton.classList.remove("selected");

    let field = document.getElementById("loginregisterfield");
    field.innerHTML = "";

    let firstname = document.createElement("input");
    let lastname = document.createElement("input");
    let username = document.createElement("input");
    let email = document.createElement("input");
    let password = document.createElement("input");

    firstname.setAttribute("type", "text");
    firstname.setAttribute("id", "registerfirstname");
    firstname.setAttribute("placeholder", "First Name");

    lastname.setAttribute("type", "text");
    lastname.setAttribute("id", "registerlastname");
    lastname.setAttribute("placeholder", "Last Name");

    email.setAttribute("type", "text");
    email.setAttribute("id", "registeremail");
    email.setAttribute("placeholder", "Email");

    username.setAttribute("type", "text");
    username.setAttribute("id", "registerusername");
    username.setAttribute("placeholder", "Username");

    password.setAttribute("type", "password");
    password.setAttribute("id", "registerpassword");
    password.setAttribute("placeholder", "Password");

    field.append(firstname);
    field.append(lastname);
    field.append(email);
    field.append(username);
    field.append(password);

    loginregistersubmit.innerHTML = "Register";
    loginregistersubmit.onclick = registerSubmit;
}
const displayLoginForm = () => {
    loginbutton.classList.add("selected");
    registerbutton.classList.remove("selected");

    let field = document.getElementById("loginregisterfield");
    let loginregistersubmit = document.getElementById("loginregistersubmit");
    field.innerHTML = "";

    let username = document.createElement("input");
    let password = document.createElement("input");

    username.setAttribute("type", "text");
    username.setAttribute("id", "registerusername");
    username.setAttribute("placeholder", "Username");

    password.setAttribute("type", "password");
    password.setAttribute("id", "registerpassword");
    password.setAttribute("placeholder", "Password");

    field.append(username);
    field.append(password);

    loginregistersubmit.innerHTML = "Login";
    loginregistersubmit.onclick = loginSubmit;
}
const loginSubmit = async () => {
    let username = document.getElementById("loginusername").value;
    let password = document.getElementById("loginpassword").value;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    let tableParam = {
        method: "POST",
        body: formData
    }
    const res = await fetch("http://localhost:8000/user/login", tableParam);
    let loginResponse = await res.json();
    console.log(loginResponse);
}
const registerSubmit = async() => {
    let firstname = document.getElementById("registerfirstname").value;
    let lastname = document.getElementById("registerlastname").value;
    let email = document.getElementById("registeremail").value;
    let username = document.getElementById("registerusername").value;
    let password = document.getElementById("registerpassword").value;

    const formData = new FormData();
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);

    let tableParam = {
        method: "POST",
        body: formData
    }

    const res = await fetch("http://localhost:8000/user/register", tableParam);
    let registerResponse = await res.json();
    console.log(registerResponse);
}

loginbutton.addEventListener("click", displayLoginForm);
registerbutton.addEventListener("click", displayRegisterForm);
loginregistersubmit.onclick = ("click", loginSubmit);