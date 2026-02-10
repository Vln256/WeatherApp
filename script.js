let unit = "metric";
const apiKey = "116a94b7a973943264656903c11caf54";   // Replace with your OpenWeather API key


//code has modified and uploaded to git from a branch

function setUnit(u) {
  unit = u;
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (city === "") return alert("Enter city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  fetchData(url);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
    fetchData(url);
  });
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod !== 200) {
    alert("City not found!");
    return;
  }

  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText =
    `${Math.round(data.main.temp)}° ${unit === "metric" ? "C" : "F"}`;
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("humidity").innerText = data.main.humidity + "%";
  document.getElementById("wind").innerText = data.wind.speed + " m/s";
  document.getElementById("pressure").innerText = data.main.pressure + " hPa";

  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
