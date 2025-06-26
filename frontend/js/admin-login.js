async function adminLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

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

  if (!data.isAdmin) {
    document.getElementById("loginMessage").innerText = "Bu sayfa sadece adminler içindir!";
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("isAdmin", true);
  window.location.href = "admin-panel.html";
}
