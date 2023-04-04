let submit = document.getElementById("submit");
let csrfToken = document.cookie.split(';');
for (let i=0; i<csrfToken.length; i++) {
    if (csrfToken[i].includes("csrftoken=")){
        csrfToken = csrfToken[i].replace("csrftoken=", "")
    }
}

const login = async(e) => {
    e.preventDefault();
    email = document.getElementById("email");
    password = document.getElementById("password");

    const addData = new FormData();

    addData.append("username", email.value);
    addData.append("password", password.value);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };
    const res = await fetch("login", tableParam);
    let sessionInfo = await res.json();
    
    if (sessionInfo["Status"] == "Success") {
        window.location.replace("/webapp");
    }
    else {
        alert(sessionInfo["Status"]);
    }
}

let tableParam = {
    method: 'GET',
};

fetch(window.location.origin + '/user/authenticate', tableParam)
    .then((res) => res.json())
    .then((data) => {
        if (data["Status"] == "Authenticated") {
            window.location.replace("/webapp");
        }
    });

submit.addEventListener('click', login);

