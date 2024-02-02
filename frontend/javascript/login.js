function validatePassword() {
  var passwordInput = document.getElementById("password-input").value;
  var loginBtn = document.getElementById("login-btn");

  // Check if the password is correct (for demonstration, using 'password123')
  if (passwordInput === "crawford") {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

function redirectToAnotherPage() {
  // Redirect to another page (for demonstration, redirecting to 'another-page.html')
  window.location.href = "./index.html";
}
