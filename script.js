const passwordInput = document.getElementById("password");
const passwordMessage = document.getElementById("passwordMessage");
const signUpBtn = document.getElementById("signUpBtn");

function isValidPassword(password) {
    const hasLength = password.length >=8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const hasNumber = /[0-9]/.test(password);
}
