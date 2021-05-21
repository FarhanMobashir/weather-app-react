import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sundoodle from "./sun-doodle.svg";
import teadoodle from "./pleasant-tea.svg";
import musicdoodle from "./pleasant-music.svg";
import skatedoodle from "./cloudy-img.svg";

import winter from "./winter.svg";
import sun from "./sun.svg";
import clouds from "./cloudy.svg";
import moonclouds from "./moon-cloud.svg";
import moonsleep from "./moon-sleep.svg";
import moon from "./moon.svg";
import rain from "./rain.svg";

const MainWrapper = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

// Left
const LeftWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 500px) {
    align-items: center;
  }
`;
const Greetings = styled.h3`
  margin-left: 20px;
  font-size: 24px;
  font-weight: 300;
`;
const DateTime = styled.h2`
  margin-left: 20px;
  font-size: 30px;
  font-weight: 600;
  margin-top: -20px;
`;
const DoodleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -150px;
  margin-left: 200px;
  // padding-left: 200px;
  height: 100%;
  @media (max-width: 500px) {
    margin: 0;
  }
`;
const Doodle = styled.img`
  max-width: 300px;
  @media (max-width: 500px) {
    max-width: 200px;
  }
`;

// Right\
const RightWrapper = styled.div`
  background-color: #70cdff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 700px;
  @media (max-width: 500px) {
    width: auto;
    height: 400px;
  }
`;

const WeatherWrapper = styled.div`
  display:flex;
  justify-content-center;
  align-items:center;
`;

const WeatherContainer = styled.div`
  // background: white;
  width: 200px;
  height: 200px;
`;

const LocationWrapper = styled.div`
  display: flex;
  font-size: 50px;
  color: #0083ca;
  @media (max-width: 500px) {
    font-size: 38px;
  }
`;
const Location = styled.div`
  font-weight: 500;
`;
const Country = styled.div`
  padding-left: 10px;
`;
const WeatherIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 30px;
  align-item: center;
  @media (max-width: 500px) {
    margin: 0px 15px;
  }
`;
const WeatherIcon = styled.img`
  max-width: 80px;
  @media (max-width: 500px) {
    max-width: 50px;
  }
`;

const TemperatureWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: #005786;
`;
const Temperature = styled.div`
  font-size: 70px;
  font-weight: 600;
  @media (max-width: 500px) {
    font-size: 50px;
  }
`;
const TemperatureToggle = styled.div`
  font-size: 30px;
  font-weight: 500;
  padding-left: 10px;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

export const Weather = (props) => {
  const [weather, setWeather] = useState("");
  const [time, setTime] = useState(new Date());
  const [tempType, setTemptype] = useState(true);
  const [temperature, setTemperature] = useState(false);

  // time-useeffect
  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date());
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (data) {
      if (data) {
        fetch(
          `https://weather-proxy.freecodecamp.rocks/api/current?lat=${data.coords.latitude}&lon=${data.coords.longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather(data);
            setTemperature(data.main.temp);
          })
          .catch("There has been an error while fetching the data");
      }
    });
  }, []);

  // doodle- image
  function doodleimage(weather) {
    if (weather) {
      if (weather.main.temp > 28) {
        return sundoodle;
      } else if (weather.weather[0].description === "scattered clouds") {
        return skatedoodle;
      } else if (weather.main.temp < 28) {
        return teadoodle;
      } else {
        return musicdoodle;
      }
    } else {
      return "";
    }
  }

  // greetings
  function greetings(time) {
    let checker = time.toLocaleTimeString()[0];
    if (checker > 0 && checker < 6) {
      return "GOOD AFTERNOON";
    } else if (checker >= 6 && checker < 8) {
      return "GOOD EVENING";
    } else if (
      time.toLocaleTimeString()[time.toLocaleTimeString().length - 2] === "P"
    ) {
      if (checker >= 8 && checker < 12) {
        return "GOOD NIGHT";
      }
    } else if (
      time.toLocaleTimeString()[time.toLocaleTimeString().length - 2] === "A"
    ) {
      if (checker >= 4 && checker < 12) {
        return "GOOD MORNING";
      }
    }
  }

  function showIcon(time, weather) {
    let checker = time.toLocaleTimeString()[0];

    if (weather) {
      if (
        time.toLocaleTimeString()[time.toLocaleTimeString().length - 2] === "P"
      ) {
        if (checker >= 8 && checker < 12) {
          // return moon;
          if (weather.weather[0].description === "clear sky") {
            return moon;
          } else if (weather.weather[0].description === "scattered clouds") {
            return moonclouds;
          } else {
            return moonsleep;
          }
        }
      } else if (weather.weather[0].description === "scattered clouds") {
        return clouds;
      } else if (weather.weather[0].description === "clear sky") {
        return sun;
      } else if (temperature < 10) {
        return winter;
      } else if (weather.weather[0].description === "moderate rain") {
        return rain;
      } else {
        console.log("hello");
        return sun;
      }
    } else {
      return "";
    }
  }

  function tempToggle() {
    if (tempType) {
      let fahrenhiet = ((temperature * 9) / 5 + 32).toFixed(2);
      setTemperature(fahrenhiet);
      setTemptype(false);
    } else {
      let celcius = (((temperature - 32) * 5) / 9).toFixed(2);
      setTemperature(celcius);
      setTemptype(true);
    }
  }
  let icon = showIcon(time, weather);
  let greet = greetings(time);
  let doodle = doodleimage(weather);
  // console.log(weather);
  // console.log(weather.weather[0].icon);

  return (
    <MainWrapper>
      <LeftWrapper>
        <Greetings>{greet}</Greetings>
        <DateTime>It's {time.toLocaleTimeString()}</DateTime>
        <DoodleContainer>
          <Doodle src={doodle}></Doodle>
        </DoodleContainer>
      </LeftWrapper>
      <RightWrapper>
        <WeatherWrapper>
          <WeatherContainer>
            <LocationWrapper>
              <Location> {weather ? weather.name : "Waiting..."}</Location>
              <Country> {weather ? weather.sys.country : "Waiting..."}</Country>
              <WeatherIconWrapper>
                <WeatherIcon src={icon}></WeatherIcon>
              </WeatherIconWrapper>
            </LocationWrapper>
            <TemperatureWrapper>
              <Temperature>
                {temperature ? temperature : "Waiting..."}
              </Temperature>
              <TemperatureToggle onClick={tempToggle}>
                {tempType ? "Celcius" : "Fahrenheit"}
              </TemperatureToggle>
            </TemperatureWrapper>
          </WeatherContainer>
        </WeatherWrapper>
      </RightWrapper>
    </MainWrapper>
  );
};
