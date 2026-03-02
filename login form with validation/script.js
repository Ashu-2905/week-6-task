// Forms
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const forgotForm = document.getElementById("forgotForm");

// Switch Forms
document.getElementById("showLogin").onclick = () => switchForm(loginForm);
document.getElementById("showRegister").onclick = () => switchForm(registerForm);
document.getElementById("showForgot").onclick = () => switchForm(forgotForm);
document.getElementById("backToLogin").onclick = () => switchForm(loginForm);

function switchForm(form) {
    registerForm.classList.remove("active");
    loginForm.classList.remove("active");
    forgotForm.classList.remove("active");
    form.classList.add("active");
}

// Email Regex
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

// ================= REGISTER =================
registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = regName.value.trim();
    let email = regEmail.value.trim();
    let password = regPassword.value.trim();

    let valid = true;

    if (name === "") {
        regNameError.textContent = "Name required";
        valid = false;
    } else regNameError.textContent = "";

    if (!emailPattern.test(email)) {
        regEmailError.textContent = "Valid email required";
        valid = false;
    } else regEmailError.textContent = "";

    if (password.length < 6) {
        regPasswordError.textContent = "Minimum 6 characters";
        valid = false;
    } else regPasswordError.textContent = "";

    if (valid) {
        localStorage.setItem(email, JSON.stringify({name, password}));
        registerSuccess.textContent = "Registration Successful! Please Login.";
        registerForm.reset();
        setTimeout(() => switchForm(loginForm), 1500);
    }
});

// ================= LOGIN =================
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let email = loginEmail.value.trim();
    let password = loginPassword.value.trim();

    let user = localStorage.getItem(email);

    if (!user) {
        loginEmailError.textContent = "Email not registered";
        return;
    }

    user = JSON.parse(user);

    if (user.password !== password) {
        loginPasswordError.textContent = "Incorrect password";
        return;
    }

    loginEmailError.textContent = "";
    loginPasswordError.textContent = "";
    loginSuccess.textContent = "Login Successful!";
    loginForm.reset();
});

// ================= FORGOT PASSWORD =================
forgotForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let email = forgotEmail.value.trim();
    let newPass = newPassword.value.trim();

    let user = localStorage.getItem(email);

    if (!user) {
        forgotError.textContent = "Email not registered";
        return;
    }

    if (newPass.length < 6) {
        newPasswordError.textContent = "Minimum 6 characters";
        return;
    }

    user = JSON.parse(user);
    user.password = newPass;
    localStorage.setItem(email, JSON.stringify(user));

    forgotSuccess.textContent = "Password Reset Successful!";
    forgotForm.reset();

    setTimeout(() => switchForm(loginForm), 1500);
});

