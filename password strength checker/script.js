const password = document.getElementById("password");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const lengthRule = document.getElementById("length");
const upperRule = document.getElementById("uppercase");
const lowerRule = document.getElementById("lowercase");
const numberRule = document.getElementById("number");
const specialRule = document.getElementById("special");

password.addEventListener("keyup", checkStrength);

function checkStrength() {
    let value = password.value;
    let strength = 0;

    // Length Check
    if (value.length >= 8) {
        strength++;
        lengthRule.classList.add("valid");
        lengthRule.classList.remove("invalid");
    } else {
        lengthRule.classList.add("invalid");
        lengthRule.classList.remove("valid");
    }

    // Uppercase Check
    if (/[A-Z]/.test(value)) {
        strength++;
        upperRule.classList.add("valid");
        upperRule.classList.remove("invalid");
    } else {
        upperRule.classList.add("invalid");
        upperRule.classList.remove("valid");
    }

    // Lowercase Check
    if (/[a-z]/.test(value)) {
        strength++;
        lowerRule.classList.add("valid");
        lowerRule.classList.remove("invalid");
    } else {
        lowerRule.classList.add("invalid");
        lowerRule.classList.remove("valid");
    }

    // Number Check
    if (/[0-9]/.test(value)) {
        strength++;
        numberRule.classList.add("valid");
        numberRule.classList.remove("invalid");
    } else {
        numberRule.classList.add("invalid");
        numberRule.classList.remove("valid");
    }

    // Special Character Check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        strength++;
        specialRule.classList.add("valid");
        specialRule.classList.remove("invalid");
    } else {
        specialRule.classList.add("invalid");
        specialRule.classList.remove("valid");
    }

    updateStrengthBar(strength);
}

function updateStrengthBar(strength) {
    let percentage = (strength / 5) * 100;
    strengthFill.style.width = percentage + "%";

    if (strength <= 2) {
        strengthFill.style.background = "red";
        strengthText.textContent = "Weak Password";
    } else if (strength === 3 || strength === 4) {
        strengthFill.style.background = "orange";
        strengthText.textContent = "Medium Strength Password";
    } else {
        strengthFill.style.background = "green";
        strengthText.textContent = "Strong Password";
    }
}
