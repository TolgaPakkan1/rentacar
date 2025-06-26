let token = localStorage.getItem("token");

if (!token || localStorage.getItem("isAdmin") !== "true") {
  window.location.href = "login.html";
}

async function submitCar() {
  const carId = document.getElementById("carId").value;
  const car = {
    brand: document.getElementById("brand").value,
    model: document.getElementById("model").value,
    year: parseInt(document.getElementById("year").value),
    transmission: document.getElementById("transmission").value,
    color: document.getElementById("color").value,
    km: parseInt(document.getElementById("km").value),
    dailyPrice: parseFloat(document.getElementById("dailyPrice").value),
    availableCount: parseInt(document.getElementById("availableCount").value),
    image: document.getElementById("image").value
  };

  const method = carId ? "PUT" : "POST";
  const url = carId
    ? `http://localhost:5000/api/cars/${carId}`
    : `http://localhost:5000/api/cars`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(car)
  });

  const data = await res.json();
  document.getElementById("addResult").innerText = data.message || "İşlem tamamlandı.";
  document.getElementById("carId").value = "";
  loadCars();
}

async function loadCars() {
  const res = await fetch("http://localhost:5000/api/cars", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  const container = document.getElementById("carList");
  container.innerHTML = "";

  data.forEach(car => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h4>${car.brand} ${car.model}</h4>
      <p>Yıl: ${car.year} | Vites: ${car.transmission} | KM: ${car.km}</p>
      <p>Renk: ${car.color} | Günlük: ${car.dailyPrice}₺ | Stok: ${car.availableCount}</p>
      <p><img src="images/${car.image}" width="100"></p>
      <button onclick="fillForm('${car.id}')">Güncelle</button>
      <button onclick="deleteCar('${car.id}')">Sil</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

async function deleteCar(id) {
  if (!confirm("Bu aracı silmek istediğinize emin misiniz?")) return;

  const res = await fetch(`http://localhost:5000/api/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  alert(data.message);
  loadCars();
}

async function fillForm(id) {
  const res = await fetch("http://localhost:5000/api/cars", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const cars = await res.json();
  const car = cars.find(c => c.id === parseInt(id));

  if (car) {
    document.getElementById("carId").value = car.id;
    document.getElementById("brand").value = car.brand;
    document.getElementById("model").value = car.model;
    document.getElementById("year").value = car.year;
    document.getElementById("transmission").value = car.transmission;
    document.getElementById("color").value = car.color;
    document.getElementById("km").value = car.km;
    document.getElementById("dailyPrice").value = car.dailyPrice;
    document.getElementById("availableCount").value = car.availableCount;
    document.getElementById("image").value = car.image;
  }
}

async function loadActiveRentals() {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  const container = document.getElementById("rentalList");
  container.innerHTML = "";

  data.forEach(r => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h4>${r.car.brand} ${r.car.model}</h4>
      <p>Kullanıcı ID: ${r.userId}</p>
      <p>${r.startDate} - ${r.endDate}</p>
      <p>Durum: ${r.status}</p>
      <button onclick="markReturned('${r.id}')">Teslim Alındı</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

async function markReturned(id) {
  const res = await fetch(`http://localhost:5000/api/rentals/${id}/return`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  alert(data.message);
  loadActiveRentals();
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
}

loadCars();
loadActiveRentals();
