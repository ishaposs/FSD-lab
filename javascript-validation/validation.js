function validateForm() {
  var name     = document.getElementById("name").value.trim();
  var email    = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var mobile   = document.getElementById("mobile").value.trim();

  var isValid = true;

  // Clear previous errors
  clearErrors();

  // Name validation
  if (name === "") {
    showError("name", "nameError", "Name must not be empty.");
    isValid = false;
  }

  // Email validation
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showError("email", "emailError", "Email must not be empty.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError("email", "emailError", "Enter a valid email address.");
    isValid = false;
  }

  // Password validation
  if (password.length < 6) {
    showError("password", "passwordError", "Password must be at least 6 characters long.");
    isValid = false;
  }

  // Mobile validation
  var mobilePattern = /^[0-9]{10}$/;
  if (mobile === "") {
    showError("mobile", "mobileError", "Mobile number must not be empty.");
    isValid = false;
  } else if (!mobilePattern.test(mobile)) {
    showError("mobile", "mobileError", "Enter a valid 10-digit mobile number.");
    isValid = false;
  }

  // Show success
  if (isValid) {
    var successMsg = document.getElementById("successMsg");
    successMsg.textContent = "Form submitted successfully!";
    successMsg.classList.add("visible");
  }

  return isValid;
}

function showError(inputId, errorId, message) {
  document.getElementById(inputId).classList.add("invalid");
  document.getElementById(errorId).textContent = message;
}

function clearErrors() {
  var inputs = document.querySelectorAll("input");
  inputs.forEach(function(input) {
    input.classList.remove("invalid");
  });

  var errors = document.querySelectorAll(".error-msg");
  errors.forEach(function(el) {
    el.textContent = "";
  });

  var successMsg = document.getElementById("successMsg");
  successMsg.textContent = "";
  successMsg.classList.remove("visible");
}