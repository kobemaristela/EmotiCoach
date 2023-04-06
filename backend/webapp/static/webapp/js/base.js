logoutButton = document.getElementById("logout");
let csrfToken = document.cookie.split(';');
for (let i=0; i<csrfToken.length; i++) {
    if (csrfToken[i].includes("csrftoken=")){
        csrfToken = csrfToken[i].replace("csrftoken=", "")
    }
}

const logout = async() => {
    console.log("test");
    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
    };
    const res = await fetch(window.location.origin + '/user/logout', tableParam);

    location.reload();
}

logoutButton.addEventListener('click', logout);