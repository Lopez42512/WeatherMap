const apiKey = "b8033cd6f91ebcbedb1a8f2576574c01";

$("document").ready(function () {
  let citySelect;
  $("#searchBtn").on("click", function () {
    citySelect = $("#input").val();
    if (citySelect) {
      $("#input").val("");
      $('#displayError').text('')
      currentCityWeather(citySelect);
      forecast(citySelect);
      prevCity(citySelect);
    } else {
        $('#displayError').text('Please Enter A City')
    }
  });
  prevCity();
});

async function currentCityWeather(selectedCity) {
  console.log(apiKey);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=imperial`
  );
  const myJson = await response.json();
  popluateCity(myJson);
}

async function forecast(selectedCity) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=imperial`
  );
  const myJson = await response.json();
  popluateCitys(myJson);
  console.log(myJson);
}

function prevCity(city) {
  const citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
  if (!citiesArray.includes(city) && city) {
    citiesArray.push(city);
    localStorage.setItem("cities", JSON.stringify(citiesArray));
  }
  $("#searchedCities").text("");
  citiesArray.forEach((city) => {
    console.log(city);
    const recentCity = $("<button>");
    recentCity.attr("type", "button");
    recentCity.attr("class", "cityBtn");
    recentCity.text(city);
    $("#searchedCities").prepend(recentCity);
  });
  $(".cityBtn").on("click", function (event) {
    let clickedCity = event.target.innerText;
    $('#displayError').text('')
    currentCityWeather(clickedCity);
    forecast(clickedCity);
  });
}

function popluateCity(cityInfo) {
  $("#city").text(`${cityInfo.name} ${todayDate()}`);
  $("#cityImg").attr(
    "src",
    `http://openweathermap.org/img/wn/${cityInfo.weather[0].icon}@2x.png`
  );
  $("#cityTemp").text(`Temp: ${cityInfo.main.temp}F`);
  $("#cityWind").text(`Wind: ${cityInfo.wind.speed}MPH`);
  $("#cityHumidity").text(`Humidity: ${cityInfo.main.humidity}%`);
}

function popluateCitys(citiesInfo) {
  let arraySpot = 4;
  for (let i = 1; i <= 5; i++) {
    $(`.date${i}`).text(`${todayDate(i)}`);
    $(`.icon${i}`).attr(
      "src",
      `http://openweathermap.org/img/wn/${citiesInfo.list[arraySpot].weather[0].icon}@2x.png`
    );
    $(`.temp${i}`).text(`Temp: ${citiesInfo.list[arraySpot].main.temp}F`);
    $(`.wind${i}`).text(`Wind: ${citiesInfo.list[arraySpot].wind.speed}MPH`);
    $(`.humidity${i}`).text(
      `Humidity: ${citiesInfo.list[arraySpot].main.humidity}%`
    );
    arraySpot += 8;
  }
}

function todayDate(addDay) {
  const date = new Date();
  const month = date.getMonth() + 1;
  let day;
  if (addDay) {
    day = date.getDate() + addDay;
  } else {
    day = date.getDate();
  }
  const year = date.getFullYear();
  const fullDate = addDay
    ? `${month}/${day}/${year}`
    : `(${month}/${day}/${year})`;
  return fullDate;
}
