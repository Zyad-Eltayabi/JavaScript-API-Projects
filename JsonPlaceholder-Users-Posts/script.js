let users = document.querySelector(".users");
function fetchUsers() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.responseType = "json";

    request.send();
    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
            let usersDate = request.response;
            for (let user of usersDate) {
                addUser(user);
            }
        } else {
            alert("Something went wrong");
        }
    };

    function addUser(user) {
        console.log(user);
        let userElement = document.createElement("a");
        userElement.href = "#";
        userElement.classList.add("user");
        userElement.innerHTML = `${user.name} <br> <span>${user.email}</span>`;
        userElement.setAttribute("userId", user.id);
        users.appendChild(userElement);
    }
}

window.addEventListener("load", fetchUsers);
