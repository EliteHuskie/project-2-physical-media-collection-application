// Listener for logout
const logoutButtonEl = document.getElementById("signOut");

logoutButtonEl.addEventListener("click", async (event) => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.href = "/";
  } else {
    alert(`Error: ${response.status}\nAn error occurred during logout.`);
  }
});