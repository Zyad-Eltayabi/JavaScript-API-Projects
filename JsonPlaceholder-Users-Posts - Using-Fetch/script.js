let users = document.querySelector(".users");

function addUser(user) {
    let userElement = document.createElement("a");
    userElement.href = "#";
    userElement.classList.add("user");
    userElement.innerHTML = `${user.name} <br> <span>${user.email}</span>`;
    userElement.setAttribute("user-Id", user.id);
    users.appendChild(userElement);
}
function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("failed to fetch users.");
            }
            return response.json();
        })
        .then((users) => {
            for (let user of users) {
                addUser(user);
            }
        })
        .catch((er) => alert(er.message));
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
