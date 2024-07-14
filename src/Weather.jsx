import React, { useState } from 'react'
import './Weather.css'

const api = {
    key: "22e5427340b8ffc879c05005ed11bc77",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const search = (evt) => {
        if(evt.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result)
                    setQuery('')
                    console.log(result)
                })
                .catch((error) =>{console.log(error)}
            )
        }
    }
    
    const dateBuilder = (d) => {
        let months = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "november" , "December"];
        let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"]; 
        
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }


    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            
            <main>
            <h1 className='heading'>Weather App </h1>
                <div className="search-box">
                    <input type="text" className="search-bar" placeholder='Enter City..' onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search} />
                </div>

                {(typeof weather.main != "undefined")?(
                <div className="location-box">
                    <div className="location">
                        {weather.name},{weather.sys.country}
                    </div>
                    <div className="date">
                        {dateBuilder(new Date())}
                    </div>
                    <div className="weather-box">
                        <div>
                        <div className='temp'>
                            {Math.round(weather.main.temp)}°C
                        </div>
                        <div className='weather'>
                        {weather.weather[0].main}
                        </div>
                        </div>
                    </div>
                </div>
                ) : ('')}
        
            </main>
        </div>
    )
}

export default Weather
