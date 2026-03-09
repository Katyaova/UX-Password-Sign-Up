const passwordInput = document.getElementById("password");
const passwordMessage = document.getElementById("passwordMessage");
const signUpBtn = document.getElementById("signUpBtn");

function isValidPassword(password) {
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
}

signUpBtn.addEventListener("click", function () {
    
    const passwordValue = passwordInput.value;

    if (!isValidPassword(passwordValue)) {
        passwordInput.classList.add("error");
        passwordMessage.classList.remove("hidden");
    } else {
        passwordInput.classList.remove("error");
        passwordMessage.classList.add("hidden");
        alert("Password accepted");
    }
});
