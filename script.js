const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyuIybCc2HZAi5nYIckkbiAZulKa000tTv9SadtrE_jyg11A2rY4ZPz4zgDiAm06ek/exec";

function shareLocation() {
  const result = document.getElementById("result");

  if (!navigator.geolocation) {
    result.innerText = "❌ Trình duyệt không hỗ trợ GPS";
    return;
  }

  result.innerText = "⏳ Đang lấy vị trí...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      result.innerHTML = `
        ✅ Đã lấy vị trí <br>
        Lat: ${lat}<br>
        Lng: ${lng}<br>
        Sai số: ±${accuracy} m
      `;

      sendToGoogleSheet(lat, lng, accuracy);
    },
    () => {
      result.innerText = "❌ Bạn đã từ chối chia sẻ vị trí";
    }
  );
}

function sendToGoogleSheet(lat, lng, accuracy) {
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      accuracy: accuracy,
      time: new Date().toISOString()
    })
  });
}
