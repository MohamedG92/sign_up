const nom = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

const button = document.getElementById("btn");


button.addEventListener("click", function () {
    if (nom.value === "" || email.value === "" || password.value === "") {
        alert("Please fill in all fields.");
    } else {
        alert("Sign up successful!");
    }
});