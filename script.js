document.addEventListener("DOMContentLoaded", () => {
    // Determine which page we are on based on container IDs
    const signupContainer = document.getElementById("signup-container");
    const loginContainer = document.getElementById("login-container");
    const welcomeContainer = document.querySelector(".welcome-container");

    // === SIGN UP LOGIC ===
    if (signupContainer) {
        const nom = document.getElementById("name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const button = document.getElementById("btn");

        button.addEventListener("click", function () {
            const nameVal = nom.value.trim();
            const emailVal = email.value.trim();
            const passVal = password.value.trim();

            if (!nameVal || !emailVal || !passVal) {
                alert("Please fill in all the fields.");
                return;
            }

            const userList = JSON.parse(localStorage.getItem("user") || "[]");
            
            // Check if email already exists
            const exists = userList.find(u => u.email === emailVal);
            if (exists) {
                alert("An account with this email already exists.");
                return;
            }

            userList.push({ nom: nameVal, email: emailVal, password: passVal });
            localStorage.setItem("user", JSON.stringify(userList));
            alert(`Sign up successful! Welcome ${nameVal}. You can now log in.`);
            
            nom.value = email.value = password.value = "";
            window.location.href = "login.html"; // Redirect to login page after sign up
        });
    }

    // === LOGIN LOGIC ===
    if (loginContainer) {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const button = document.getElementById("btn");

        button.addEventListener("click", function () {
            const emailVal = email.value.trim();
            const passVal = password.value.trim();

            if (!emailVal || !passVal) {
                alert("Please fill in your email and password.");
                return;
            }

            const users = JSON.parse(localStorage.getItem("user") || "[]");
            const validUser = users.find(u => u.email === emailVal && u.password === passVal);

            if (validUser) {
                // Save active user session
                localStorage.setItem("activeUser", JSON.stringify(validUser));
                window.location.href = "welcome.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // === WELCOME PAGE LOGIC ===
    if (welcomeContainer) {
        const activeUser = JSON.parse(localStorage.getItem("activeUser"));
        
        // If no active user, redirect back to login
        if (!activeUser) {
            window.location.href = "login.html";
            return;
        }

        const title = document.getElementById("welcome-title");
        title.textContent = `Welcome, ${activeUser.nom}!`;

        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("activeUser");
            window.location.href = "login.html";
        });
    }
});