async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  document.getElementById("registerMessage").innerText = data.message || "Bir hata oluştu.";

  if (res.ok) {
    setTimeout(() => window.location.href = "login.html", 1500);
  }
}
