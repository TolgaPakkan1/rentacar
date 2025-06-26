document.addEventListener("DOMContentLoaded", fetchActiveRentals);

async function fetchActiveRentals() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Giriş yapmalısınız.");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch("http://localhost:5000/api/auth/login", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  const list = document.getElementById("carList");
  list.innerHTML = "";

  const activeRentals = data.filter(r => r.status === "active");

  if (activeRentals.length === 0) {
    list.innerHTML = "<p>Aktif kiralanmış araç bulunmamaktadır.</p>";
    return;
  }

  activeRentals.forEach((rental) => {
    const div = document.createElement("div");
    div.className = "car";
    div.innerHTML = `
      <h4>${rental.car.brand} ${rental.car.model}</h4>
      <p>Yıl: ${rental.car.year} - Vites: ${rental.car.transmission}</p>
      <p>Renk: ${rental.car.color} - KM: ${rental.car.km}</p>
      <p>Günlük Fiyat: ${rental.car.dailyPrice}₺</p>
      <p>Tarih: ${rental.startDate} → ${rental.endDate}</p>
      <p>Toplam: ${rental.price}₺</p>
      <p><strong>Alış Noktası:</strong> ${rental.pickupLocation}</p>
      <p><strong>Teslim Noktası:</strong> ${rental.dropoffLocation}</p>
      <img src="images/${rental.car.image}" width="200" />
      <button disabled style="background-color: gray; cursor: default;">Kiralandı</button>
    `;
    list.appendChild(div);
  });
}
