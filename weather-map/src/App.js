import React, {Component} from "react";
import Header from "./Components/Header";
import MainContainer from "./Components/MainContainer";
const apiKey = "b8033cd6f91ebcbedb1a8f2576574c01";

class App extends Component {
    
    state = {
        citySearch: '',
        results: '',
        forecastResults: '',
        prevCity: null
    }

    componentDidMount = () => {
        // Grab Cities from local storage and save them to prevCity state in order to populate prev cities buttons
        this.setState({prevCity: JSON.parse(localStorage.getItem('cities')) || []})
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    handleClick = () => {
        // Push searched city to prevCity array to be save to local storage
        let {citySearch, prevCity} = this.state
        // Checking to see if the searched city is already in the array if not we include it into the array
        if(!prevCity.includes(citySearch) && citySearch){
            prevCity.push(citySearch)
            // Save prevCities to localstorage
            localStorage.setItem('cities', JSON.stringify(prevCity))
        }
        
        // Search weather api for searched city and return data to populate forecast
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.citySearch}&appid=${apiKey}&units=imperial`)
        .then(Response => Response.json())
        .then(results => this.setState({results: results}))
        this.forecast();
        this.setState({citySearch: ''})
    }

    forecast = () => {
        // fetches the 5 day forecast for the selected city
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.citySearch}&appid=${apiKey}&units=imperial`)
        .then(Response => Response.json())
        .then(results => {
            // loop through the results list and only return the day if the time is noon
            let desiredTime = [];
            for(let i = 6; i < results.list.length; i += 8){
                desiredTime.push(results.list[i]);
            }
            this.setState({forecastResults: desiredTime})
        })
    }

    // Display the forecast when one of the previous cities button is click
    prevCityClick = (event) => {
        const {name} = event.target;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=imperial`)
        .then(Response => Response.json())
        .then(results => this.setState({results: results}))
        this.prevForecast(name)
    }

    prevForecast = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
        .then(Response => Response.json())
        .then(results => {
            // loop through the results list and only return the day if the time is noon
            let desiredTime = [];
            for(let i = 6; i < results.list.length; i += 8){
                desiredTime.push(results.list[i]);
            }
            this.setState({forecastResults: desiredTime})
        })
    }

    render(){
        return(
            <div>
                <Header />
                <MainContainer forecast={this.forecastResults} prevCityClick={this.prevCityClick} handleChange={this.handleChange} handleClick={this.handleClick} data={this.state} />
            </div>
        )
    }
}

export default App;