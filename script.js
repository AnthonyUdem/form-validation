// Get elements by their IDs
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const email_label = document.getElementById('email-label')
const email_error = document.getElementById('email-error')
const phone_number = document.getElementById("phone-number");
const password = document.getElementById("password");
const comfirm_password = document.getElementById("comfirm-password");
const error_message = document.getElementById("error-message");
const bio_info = document.getElementById("bio-info");
const word_count_display = document.getElementById("word-count");
const resume = document.getElementById("resume");
const file_error = document.getElementById("file-error");
const country = document.getElementById('country')
const male = document.getElementById('male')
const female = document.getElementById('female')
const age = document.getElementById('age')
const birth_date = document.getElementById('date')
const terms_checkbox = document.getElementById('terms-Checkbox')
const terms_error_message = document.getElementById('terms_error-message')
const reset = document.getElementById('reset')




// Constants for validations
const max_words = 100;
const max_size = 2 * 1024 * 1024; // 2 MB in bytes

// Bio info word count listener
if (bio_info && word_count_display) {
    bio_info.addEventListener("input", function () {
        const words = bio_info.value.trim().split(/\s+/);
        const word_count = words[0] === "" ? 0 : words.length;

        // Trim bio if word count exceeds limit
        if (word_count > max_words) {
            const trimmedText = words.slice(0, max_words).join(" ");
            bio_info.value = trimmedText;
        }

        // Update word count display
        word_count_display.textContent = `Words: ${word_count}/${max_words}`;
        word_count_display.style.color = word_count > max_words ? "darkred" : "";
    });
}

// Resume file size validation
if (resume && file_error) {
    resume.addEventListener("change", function () {
        const file = resume.files[0];
        if (file && file.size > max_size) {
            file_error.style.display = "block";
            file_error.textContent = "File size exceeds 2 MB limit";
            resume.value = ""; // Clear the file input
        } else {
            file_error.style.display = "none";
        }
    });
}


// Form submission event listener
form?.addEventListener("submit", function (e) {
    let errors = [];
    const isSignup = !!(username && comfirm_password);

    if (isSignup) {
        errors = getSignupFormErrors(
            username.value,
            email.value,
            password.value,
            comfirm_password.value
        );
    } else {
        errors = getLoginFormErrors(email.value, password.value);
    }

    // Prevent form submission if there are errors
    if (errors.length > 0) {
        e.preventDefault(); // Stop form submission
        error_message.innerText = errors.join(',  ');
        error_message.style.display = "block";
    } else {
        error_message.style.display = "none";
    }
});

const validateEmail = () => {

    if (!email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(( \[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        email_error.innerHTML = "Please enter a valid email";
        email.style.borderBottomColor = "red";
        email_error.style.top = "105";
        email_label.style.color = "red";
        return false;
    }

    email_error.innerHTML = "";
    email.style.borderBottomColor = "green";
    email_error.style.top = "100%";
    email_label.style.color = "green";
    return true;
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password").querySelector("i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

// Function to validate signup form
function getSignupFormErrors(username, email, password, comfirm_password) {
    let errors = [];

    // Username validation
    if (!username || username.trim() === "") {
        errors.push("Username is required");
        markFieldAsIncorrect("username");
    } else if (username.length < 3) {
        errors.push("Username must be longer than 3 characters");
        markFieldAsIncorrect("username");
    }

    // Email validation
    if (!email || email.trim() === "") {
        errors.push("Email is required");
        markFieldAsIncorrect("email");
    } else {
        validateEmail()
    }

    // Age validation
    if (age.value == "") {
        errors.push("Age is requried")
        markFieldAsIncorrect("age")
    }

    // Gender validation
    if (!male.checked && !female.checked) {
        errors.push("Your gender is requried")
        markFieldAsIncorrect("male")
        markFieldAsIncorrect("female")
    }

    // phone number validation
    if (phone_number.value == "") {
        errors.push("Phone number is requried")
        markFieldAsIncorrect("phone_number")
    } else if (phone_number.value.length > 14) {
        errors.push("Phone number length must not exceed 14")
        markFieldAsIncorrect("phone_number")
    }

    // Country validation
    if (country.value == "") {
        errors.push("Please select your country")
        markFieldAsIncorrect("country")
    }

    // Password validation
    if (!password || password.trim() === "") {
        errors.push("Password is required");
        markFieldAsIncorrect("password");
    } else if (password.length < 8) {
        errors.push("Password must have at least 8 characters");
        markFieldAsIncorrect("password");
    }

    // comfirm password validation
    if (!comfirm_password || comfirm_password.trim() === "") {
        errors.push("Comfirm password is required");
        markFieldAsIncorrect("comfirm-password");
    } else if (password !== comfirm_password) {
        errors.push("Passwords do not match");
        markFieldAsIncorrect("password");
        markFieldAsIncorrect("comfirm-password");
    }

    // comfirm terms and condition validation
    if (!terms_checkbox.checked) {
        terms_error_message.classList.remove('hide_terms-error'); // Show error if checkbox not checked
        terms_error_message.style.fontSize= "1.2rem"; 
        terms_error_message.style.color= "var(--red)"; 
        errors.push("Please accept the terms and conditions.");
        markFieldAsIncorrect("terms-checkbox");
        
    } else {
        terms_error_message.classList.add('hide_terms-error'); // Hide error if checked
    }

    return errors;
}

// Function to validate login form
function getLoginFormErrors(email, password) {
    let errors = [];

    // Email validation
    if (!email || email.trim() === "") {
        errors.push("Email is required");
        markFieldAsIncorrect("email");
    }

    // Password validation
    if (!password || password.trim() === "") {
        errors.push("Password is required");
        markFieldAsIncorrect("password");
    }

    return errors;
}

// Reset function
function resetForm() {
    // Clear all input fields
    form.reset();

    // Reset error messages and styles
    error_message.style.display = "none";
    email_error.innerHTML = "";
    file_error.style.display = "none";
    word_count_display.textContent = `Words: 0/${max_words}`;
    terms_error_message.classList.add('hide_terms-error');

    // Reset border colors and labels
    email.style.borderBottomColor = "";
    email_label.style.color = "";

    // Remove any marked incorrect fields
    const incorrectFields = document.querySelectorAll(".incorrect");
    incorrectFields.forEach(field => field.classList.remove("incorrect"));
}

// Add event listener to the reset button
reset?.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    resetForm(); // Call the reset function
});



// Helper function to mark fields with errors
function markFieldAsIncorrect(fieldId) {
    const field = document.getElementById(fieldId);
    if (field && field.parentElement) {
        field.parentElement.classList.add("incorrect");
    }
}

// Input change listeners to clear error state
const allInputs = [username, email, password, comfirm_password].filter(input => input);
allInputs.forEach(input => {
    input?.addEventListener("input", () => {
        if (input.parentElement.classList.contains("incorrect") && input.value.trim() !== "") {
            input.parentElement.classList.remove("incorrect");
            error_message.innerText = "";
        }
    });
});