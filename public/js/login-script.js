// Listener for signup/login
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const loginBttnEl = document.getElementById("login");

loginBttnEl.addEventListener("click", async (event) => {
  const usernameInput = usernameEl.value;
  const passwordInput = passwordEl.value;

  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: usernameInput, password: passwordInput }),
  });

  const data = await response.json();

  if (response.ok) {
    window.location.href = "/home";
  } else {
    alert(`Error: ${response.status}\n${data.message}`);
  }
});
