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
        let userElement = document.createElement("a");
        userElement.href = "#";
        userElement.classList.add("user");
        userElement.innerHTML = `${user.name} <br> <span>${user.email}</span>`;
        userElement.setAttribute("user-Id", user.id);
        users.appendChild(userElement);
    }
}

window.addEventListener("load", fetchUsers);


let posts = document.querySelector(".posts");
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("user")) {
        e.preventDefault();
        fetchUserPosts(e.target);
    }
});

function fetchUserPosts(user) {
    let userId = user.getAttribute("user-Id");
    let request = new XMLHttpRequest();
    request.open(
        "GET",
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    request.responseType = "json";
    request.send();
    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
            addUserPosts(request.response);
        } else {
            alert("Something went wrong");
        }
    };
}

function addPost(post) {
    let postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
            <h3 class="post-title">${post.title}</h3>
            <hr>
            <p class="post-body">${post.body}</p>
        `;
    posts.appendChild(postElement);
}

function addUserPosts(userPosts) {
    posts.innerHTML = "";
    for (let post of userPosts) {
        addPost(post);
    }
}