let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskError = document.getElementById("taskError");
const taskCount = document.getElementById("taskCount");

function showTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        if (tasks[i].done) {
            li.classList.add("done");
        }

        const span = document.createElement("span");
        span.textContent = tasks[i].text;
        span.addEventListener("click", function () {
            tasks[i].done = !tasks[i].done;
            showTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", function () {
            tasks.splice(i, 1);
            showTasks();
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    }

    taskCount.textContent = "Total tasks: " + tasks.length;
}

function addTask() {
    const value = taskInput.value.trim();

    if (value === "") {
        taskError.textContent = "Please enter a task";
        return;
    }

    taskError.textContent = "";
    tasks.push({ text: value, done: false });
    taskInput.value = "";
    showTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;
    successMsg.textContent = "";

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    if (nameInput.value.trim().length < 3) {
        document.getElementById("nameError").textContent = "Name must be at least 3 characters";
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        document.getElementById("emailError").textContent = "Enter a valid email address";
        valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
        document.getElementById("phoneError").textContent = "Phone number must be 10 digits";
        valid = false;
    }

    if (passwordInput.value.length < 6) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
        valid = false;
    }

    if (valid) {
        successMsg.textContent = "Form submitted successfully!";
        form.reset();
    }
});

const loadBtn = document.getElementById("loadBtn");
const userList = document.getElementById("userList");
const apiMsg = document.getElementById("apiMsg");

loadBtn.addEventListener("click", function () {
    apiMsg.textContent = "Loading...";
    userList.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            apiMsg.textContent = "";

            for (let i = 0; i < data.length; i++) {
                const card = document.createElement("div");
                card.classList.add("user-card");
                card.innerHTML =
                    "<h3>" + data[i].name + "</h3>" +
                    "<p>Email: " + data[i].email + "</p>" +
                    "<p>Phone: " + data[i].phone + "</p>" +
                    "<p>City: " + data[i].address.city + "</p>";
                userList.appendChild(card);
            }
        })
        .catch(function () {
            apiMsg.textContent = "Could not load data. Please try again.";
        });
});