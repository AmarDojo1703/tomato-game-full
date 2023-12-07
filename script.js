const greetUser = document.getElementById("greetUser");
const logoutBtn = document.getElementById("logoutBtn");

const onDOMContentLoaded = (e) => {
  if (
    !document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("username=test"))
  ) {
    location.href = "login.html";
  }

  //This piece of code is used from
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#example_2_get_a_sample_cookie_named_test2
  const usernameCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("username="))
    ?.split("=")[1];

  greetUser.innerText = `Welcome, ${usernameCookie}`;
};

const onLogout = (e) => {
  document.cookie = "username=test; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  location.href = "login.html";
};

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
logoutBtn.addEventListener("click", onLogout);
