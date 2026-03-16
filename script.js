const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const passwordMessage = document.getElementById("passwordMessage");
const signUpBtn = document.getElementById("signUpBtn");

const startTime = Date.now();
let failedAttempts = 0;

function submitToGoogleForm(data) {
    fetch("https://docs.google.com/forms/d/e/1FAIpQLSf9f6Ddp7Q17XgFfwefPYaiX0ZdBATKhtH5ZyqGTZYUrBEhcg/formResponse", {
     method: "POST",
     mode: "no-cors",
     headers: {
        "Content-Type": "application/x-www-form-urlencoded"
     },
     body: new URLSearchParams({
        "entry.116586135": data.participantID,
        "entry.725059856": data.passwordLength,
        "entry.841442949": data.score,
        "entry.1808329028": data.crackTime,
        "entry.1260201898": data.patternName,
        "entry.1179553110": data.patternYear,
        "entry.1983954456": data.patternSequence,
        "entry.1248909794": data.timeTaken
     })
    });
    }

function isValidPassword(password) {
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
}

signUpBtn.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    const passwordValue = passwordInput.value;

    const result = zxcvbn(passwordValue, [username]); 
    const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second;

    const lowerPassword = passwordValue.toLowerCase();
    const lowerUsername = username.toLowerCase();

    const patternName = lowerUsername && lowerPassword.includes(lowerUsername) ? 1 : 0;
    const patternYear = /(19\d{2}|20\d{2})/.test(passwordValue) ? 1 : 0;
    const patternSequence = /(123|1234|abc|qwerty)/i.test(passwordValue) ? 1 : 0;

    const timeTaken = Math.round((Date.now () - startTime) / 1000);

    if (!username) {
        usernameInput.focus();
        return;
    }
    if (!isValidPassword(passwordValue)) {
        failedAttempts++;
        passwordInput.classList.add("error");
        passwordMessage.classList.remove("hidden");
        passwordInput.focus();
        return;
        
    } else {
        passwordInput.classList.remove("error");
        passwordMessage.classList.add("hidden");
    }
    submitToGoogleForm({
        participantID: username,
        passwordLength: passwordValue.length,
        score: result.score,
        crackTime: crackTime,
        patternName : patternName,
        patternYear : patternYear,
        patternSequence : patternSequence,
        timeTaken: timeTaken,
       });

       alert("Account Created Successfully!")
    
});
