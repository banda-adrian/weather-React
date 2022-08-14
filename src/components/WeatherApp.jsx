import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4b4a41c0bbf55aca9db7d6dd436cd577`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }

    return (
        <div className="h-screen v-screen relative bg-[#7f7f7f] ">
            {/* search, input */}
            <div className="text-center p-5">
                <input className='p-1 text-base rounded-[25px] outline-white'
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Search by city'
                    type="text" />
            </div>
            {/* container */}
            <div className="max-w-[700px] h-[700px] m-auto p-4 relative top-[10%] flex flex-col justify-between">
                
                {/* top */}
                <div className="w-full m-4-auto">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp text-8xl">
                        {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                    </div>
                    <div className="weather">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {/* bottom */}
                {data.name !== undefined &&
                    <div className="flex justify-evenly text-center w-full m-4-auto p-4 rounded-xl bg-white">
                        <div className="feels">
                            {data.main ? <p className='font-bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                            <p className>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className='font-bold'>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='font-bold'>{data.wind.speed.toFixed()} mph</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>

        </div >
    )
}

export default WeatherApp;