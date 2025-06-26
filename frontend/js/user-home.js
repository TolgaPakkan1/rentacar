document.addEventListener("DOMContentLoaded", () => {
  fetchCars();
  document.getElementById("brandFilter").addEventListener("change", fetchCars);
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

async function fetchCars() {
  const brand = document.getElementById("brandFilter").value;
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/cars${brand ? `?brand=${brand}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  const list = document.getElementById("carList");
  list.innerHTML = "";

  const brands = [...new Set(data.map((car) => car.brand))];
  const brandSelect = document.getElementById("brandFilter");
  brandSelect.innerHTML = '<option value="">Tüm Markalar</option>';
  brands.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    brandSelect.appendChild(opt);
  });
  brandSelect.value = brand;

  data.forEach((car) => {
    const div = document.createElement("div");
    div.className = "car";
    div.innerHTML = `
      <h4>${car.brand} ${car.model}</h4>
      <p>Yıl: ${car.year}</p>
      <p>Vites: ${car.transmission}</p>
      <p>Renk: ${car.color}</p>
      <p>KM: ${car.km}</p>
      <p>Günlük: ${car.dailyPrice}₺</p>
      <p>Stok: ${car.availableCount}</p>
      <img src="images/${car.image}" width="200"/>
      <button onclick='openModal(${JSON.stringify(car)})'>Kirala</button>
    `;
    list.appendChild(div);
  });
}

function openModal(car) {
  document.getElementById("modalBrand").textContent = car.brand;
  document.getElementById("modalModel").textContent = car.model;
  document.getElementById("modalDailyPrice").textContent = car.dailyPrice;
  document.getElementById("rentalCarId").value = car.id;
  document.getElementById("rentalResult").textContent = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("pickupLocation").value = "";
  document.getElementById("dropoffLocation").value = "";
  document.getElementById("rentModal").style.display = "block";
}

function closeModal() {
  document.getElementById("rentModal").style.display = "none";
}

function calculatePrice() {
  const dailyPrice = parseFloat(document.getElementById("modalDailyPrice").textContent);
  const start = new Date(document.getElementById("startDate").value);
  const end = new Date(document.getElementById("endDate").value);

  if (!start || !end || isNaN(start) || isNaN(end) || start > end) {
    document.getElementById("rentalResult").textContent = "Tarihleri düzgün giriniz.";
    return;
  }

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  const total = days * dailyPrice;
  document.getElementById("rentalResult").textContent = `${days} gün - Toplam: ${total}₺`;
}

async function rentCar() {
  const carId = document.getElementById("rentalCarId").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const pickupLocation = document.getElementById("pickupLocation").value;
  const dropoffLocation = document.getElementById("dropoffLocation").value;

  const dailyPrice = parseFloat(document.getElementById("modalDailyPrice").textContent);
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  const totalPrice = days * dailyPrice;

  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/rentals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      carId,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      price: totalPrice  // 💥 EKLENDİ!
    }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Araç başarıyla kiralandı.");
    closeModal();
    fetchCars();
  } else {
    alert(data.message || "Bir hata oluştu.");
  }
}
