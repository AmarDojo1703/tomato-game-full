const loginForm = document.getElementById("loginForm");

const onDOMContentLoaded = (e) => {
  if (
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("username=test"))
  ) {
    location.href = "index.html";
  }
};

const onLoginFormSubmit = (e) => {
  e.preventDefault();
  let loginData = new FormData(loginForm);
  if (
    !loginData.get("username") === "test" ||
    !loginData.get("password") === "test123"
  ) {
    alert("Invalid username or password!");
    return;
  }

  document.cookie = "username=test; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  location.href = "index.html";
};

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
loginForm.addEventListener("submit", onLoginFormSubmit);
