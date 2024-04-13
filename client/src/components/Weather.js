import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [weather1, setWeather1] = useState(null);
  const [lati, setLati] = useState(null);
  const [longi, setLongi] = useState(null);

  const fetchWeather = async () => {
    try {
      // Fetching user's location
      const locationResponse = await fetch('https://ipapi.co/json/');
      const locationData = await locationResponse.json();
      const { latitude, longitude } = locationData;
      setLati(latitude);
      setLongi(longitude);
      console.error('fetching weather data now:');

      // Fetching weather data from OpenWeatherMap API
      const apiKey = '17f49effbe016291e5a52a884ec49c1b'; // Replace with your API key
    //   const apiKey = 'a7992747081d3629c2d6237ec1f94404'; // Replace with your API key
      const weatherResponse = await fetch(
        // `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}`
        // `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      console.error('weather response: ', weatherData);

      // Extracting weather for today and tomorrow
    //   const todayWeather = weatherData;
    //   const tomorrowWeather = weatherData.daily[1];

      // Updating state with weather data
      setWeather(weatherData);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <Container>
      <Paragraph>
        Coords: {lati}N , {longi}E 
        {/* {weather?.cod} */}
      </Paragraph>      
      <Paragraph>
        Location:  {weather?.name}
      </Paragraph>
      <Paragraph>
        Today:   
            {weather?.main?.temp} C
        {/* {Math.round(weather?.today.temp.day - 273.15)}°C */}
      </Paragraph>
      <Paragraph>
        {/* Tomorrow:  */}
            {weather?.main?.humidity}% humidity,
        {/* {Math.round(weather?.tomorrow.temp.day - 273.15)}°C */}
      </Paragraph>
      <Button onClick={fetchWeather}>Get Weather</Button>
    </Container>
  );
};

export default Weather;
