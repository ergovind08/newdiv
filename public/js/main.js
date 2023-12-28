const apikey = "449864f184af0ebde47c3f6ba75213c4";

const citynameinput = document.getElementById("city");
const submitBtn = document.getElementById("submit_btn");
const city_nameoutput = document.getElementById("city_n");
const tempout = document.getElementById("temp");

const headname = document.getElementById("head-name");
const tempstatus = document.getElementById("temp-status");
const cardtext = document.getElementById("card-text");

function kelvintocel(kelvin) {
  return kelvin - 273.15;
}

const getinfo = async (event) => {
  event.preventDefault();
  let cityval = citynameinput.value.trim();

  if (cityval === "") {
    city_nameoutput.innerHTML = `Please write the city name before you search`;
    alert("Please enter the city name");
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=${apikey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== "404") {
        const outname = data.name;
        const loc = data.sys.country;
        headname.style.display = "block";
        headname.innerHTML = `${outname}`;
        const tempS = data.weather[0].description;
        const temp = parseInt(kelvintocel(data.main.temp));
        const humidity = data.main.humidity;

        tempout.innerHTML = `${temp}ºC`;
        city_nameoutput.innerHTML = `${outname}  ${loc}`;
        tempstatus.innerHTML = `Temp Status : ${tempS}`;
        cardtext.innerHTML = `Humidity : ${humidity}%`;

        console.log(data);
      } else {
        alert("City not found. Please enter a valid city name.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred. Please try again later.");
    }
  }
};

submitBtn.addEventListener("click", getinfo);
