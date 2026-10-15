import React, { useEffect, useState } from "react";

function WeatherReport({ today, tomorrow, day3, day4, day5, day6, day7 }) {
  const [weather, setWeather] = useState("Loading...");
  const [forecast, setForecast] = useState(null);
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
                      fetch(`https://api.weather.gov/points/${lat},${long}`)
                          .then((response) => response.json())
                          .then((res) => {
                              console.log(res.properties.forecast);
                              setForecast(res.properties.forecast);
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

      useEffect(() => {
        if (forecast){
          fetch(forecast)
            .then((response) => response.json())
            .then((res) => {
              console.log(res);
              setdailyWeather(res.properties.periods)
            })
            .catch();
        }
        }, [forecast]);

      useEffect(() => {
        if (dailyWeather){
          console.log(dailyWeather)
        }
      }, [dailyWeather]);
  return (
      <table>
          <thead>
              <tr>
                  <th>{today.toLocaleDateString()}</th>
                  <th>{tomorrow.toLocaleDateString()}</th>
                  <th>{day3.toLocaleDateString()}</th>
                  <th>{day4.toLocaleDateString()}</th>
                  <th>{day5.toLocaleDateString()}</th>
                  <th>{day6.toLocaleDateString()}</th>
                  <th>{day7.toLocaleDateString()}</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  {dailyWeather && dailyWeather
                    .filter(period => period.isDaytime === true)
                    .slice(0,7)
                    .map((period,index)=> (
                      <td key={index} style={{ 
                          textAlign: 'center', 
                          verticalAlign: 'top', 
                          border: '1px solid #ccc', 
                          padding: '10px',
                          display: 'table-cell',
                          width: '14.28%', // Forces 7 equal columns across the table width
                          height: 'auto',      // <-- Forces cell to grow vertically
                          minHeight: '150px',  // <-- Gives enough room for everything
                          overflow: 'visible'  // <-- Prevents clipping
                        }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '6px' }}>{period.temperature}&deg;{period.temperatureUnit}</div>
                        <img src={period.icon} alt={period.shortForecast || "Weather icon"} style={{ width: '80px', height: '80px', display: 'block', margin: '0 auto 6px auto' }}/>
                        <div style={{ fontSize: '0.8rem', lineHeight: '1.2', marginBottom: '6px' }}>{period.shortForecast}</div>
                        <div style={{ fontSize: '0.75rem' }}>{period.windSpeed} {period.windDirection}</div>
                      </td>
                    ))}
              </tr>
          </tbody>
      </table>
      );
}

export default WeatherReport;
