function validatePassword() {
  var passwordInput = document.getElementById("password-input").value;
  var loginBtn = document.getElementById("login-btn");

  // Check if the password is correct (for demonstration, using 'password123')
  if (passwordInput === "crawford") {
    loginBtn.disabled = false;
  } else if (passwordInput === "CRAWFORD") {
    loginBtn.disabled = false;
  } else if (passwordInput === "Crawford") {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

function redirectToAnotherPage() {
  // Redirect to another page (for demonstration, redirecting to 'another-page.html')
  window.location.href = "./htmlFolders/landing.html";
}
document
  .getElementById("toggle-password")
  .addEventListener("click", function () {
    var passwordInput = document.getElementById("password-input");
    var icon = document.getElementById("toggle-password");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
