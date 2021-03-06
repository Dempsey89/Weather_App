import React from 'react';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';
import classes from './App.css';

const API_KEY = "58f302d197c95473d245310372a6de02";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&&units=metric`);
    const data = await api_call.json();
    if (city && country){  
      console.log(data);
      this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
  } else{
      console.log(data);
      this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please enter the values."
    });
  }

  }

  render(){
    return(
      <div className="weatherApp">
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        />
      </div>
    );
  }
};


export default App;
