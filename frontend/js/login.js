async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (!res.ok) {
    document.getElementById("loginMessage").innerText = data.message || "Hata!";
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("isAdmin", data.isAdmin);

  window.location.href = data.isAdmin ? "admin-panel.html" : "user-home.html";
}
