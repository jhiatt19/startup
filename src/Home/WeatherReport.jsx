import React, {useEffect,useState} from 'react';

function WeatherReport({today, tomorrow, day3, day4, day5, day6 }) {
    const [weather,setWeather] = useState('Loading...');
    const [currWeather, setCurrWeather] = useState(null);
    const [weatherAlerts, setWeatherAlerts] = useState(null);
    const [hourlyWeather, sethourlyWeather] = useState(null);
    const [dailyWeather, setdailyWeather] = useState(null);
    useEffect(() => {
            let lat ='';
            let long ='';
            const apiKey = 'f8a98633cea584f2430e910797245340';
            if ("geolocation" in navigator){
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        lat = position.coords.latitude;
                        long = position.coords.longitude;
                        console.log("Found lat and long?:", lat, long);
                        fetch(`https://api.weatherxu.com/v1/weather?api_key=${apiKey}&lat=${lat}&lon= ${long}&units=imperial`)
                            .then((response) => response.json())
                            .then((res) => {
                                console.log(res);
                                setCurrWeather(res.data.currently || {});
                                sethourlyWeather(res.data.hourly.data || {});
                                setWeatherAlerts(res.alerts || {});
                                setdailyWeather(res.data.daily.data || {});
                            })
                            .catch();
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                    }
                )
            } else {
                console.error("Geolocation is not available in this browsser");
            }
            console.log("What is lat and long before weather api req:",lat,long);
            
        }, []);
        console.log(dailyWeather);
    return (
        <table>
            <thead>
                <tr>
                    <th>Label</th>
                    <th>{today.toLocaleDateString()}</th>
                    <th>{tomorrow.toLocaleDateString()}</th>
                    <th>{day3.toLocaleDateString()}</th>
                    <th>{day4.toLocaleDateString()}</th>
                    <th>{day5.toLocaleDateString()}</th>
                    <th>{day6.toLocaleDateString()}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span>HIGH</span><br></br><span>LOW</span></td>
                    <td><span>{dailyWeather && dailyWeather[0].apparentTemperatureMax}</span><br/><span>{dailyWeather && dailyWeather[0].apparentTemperatureMin}</span></td>
                    <td><span>{dailyWeather && dailyWeather[1].apparentTemperatureMax}<br/></span><span>{dailyWeather && dailyWeather[1].apparentTemperatureMin}</span></td>
                    <td><span>{dailyWeather && dailyWeather[2].apparentTemperatureMax}</span><br/><span>{dailyWeather && dailyWeather[2].apparentTemperatureMin}</span></td>
                    <td><span>{dailyWeather && dailyWeather[3].apparentTemperatureMax}</span><br/><span>{dailyWeather && dailyWeather[3].apparentTemperatureMin}</span></td>
                    <td><span>{dailyWeather && dailyWeather[4].apparentTemperatureMax}</span><br/><span>{dailyWeather && dailyWeather[4].apparentTemperatureMin}</span></td>
                    <td><span>{dailyWeather && dailyWeather[5].apparentTemperatureMax}</span><br/><span>{dailyWeather && dailyWeather[5].apparentTemperatureMin}</span></td>
                </tr>
            </tbody>
        </table>
        );
    };

    export default WeatherReport;