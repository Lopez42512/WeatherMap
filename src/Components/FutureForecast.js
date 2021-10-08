import React from 'react';

function FutureForecast(props) {
    return(
        <div className="day">
            <h3>{props.date}</h3>
            <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} alt="" className="icon1" />
            <p className="temp1">Temp: {props.data.main.temp}F</p>
            <p className="wind1">Wind: {props.data.wind.speed}MPH</p>
            <p className="humidity1">Humidity: {props.data.main.humidity}%</p>
        </div>
    )
}

export default FutureForecast