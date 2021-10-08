import React from "react";
import FutureForecast from "./FutureForecast";

function MainContainer(props) {
    // Get the date, when looking at future forecast they will pass a prop to calulate the future date
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

    // Map through the previous city area and create a button for each button that are able to be clicked to redisplay that forecast
    let prevCities = props.data.prevCity ? props.data.prevCity.map((city,i) => {
        return(
            <button key={i} name={city} onClick={props.prevCityClick}>{city}</button>
        )
    }) : null
    // Same as prevCities but for the 5 day forecast instead
    let forecast = props.data.forecastResults ? props.data.forecastResults.map((day, i) => {
        return(
            <FutureForecast key={i} data={day} date={todayDate(i + 1)} />
        )
    }) : null;
  return (
    <main id="mainContainer">
      <div id="left">
        <h3>Search for a City:</h3>
        <input
          name="citySearch"
          value={props.data.citySearch}
          onChange={props.handleChange}
          id="input"
          type="text"
          placeholder="Search for a City"
        />
        <br />
        <button onClick={props.handleClick} id="searchBtn">
          Search
        </button>
        {/* <h3 id="displayError"></h3> */}
        {props.data.prevCity ? <div id="searchedCities">{prevCities}</div> : null}
        
      </div>
      <div id="right">
        {props.data.results ? (
          <div id="cityContainer">
            <h3 id="city">{props.data.results.name} {todayDate()}</h3>
            <img
              id="cityImg"
              src={`http://openweathermap.org/img/wn/${props.data.results.weather[0].icon}@2x.png`}
              alt=""
            />
            <p id="cityTemp">Temp: {props.data.results.main.temp}F</p>
            <p id="cityWind">Wind: {props.data.results.wind.speed}MPH</p>
            <p id="cityHumidity">Humidity: {props.data.results.main.humidity}%</p>
            {/* <!-- <p id="cityUvIndex"></p> --> */}
          </div>
        ) : null}
        {props.data.forecastResults ? <h4>5-Day Forecast:</h4> : null}
        <div id="futureForecast">
          {forecast}
        </div>
      </div>
    </main>
  );
}

export default MainContainer;
