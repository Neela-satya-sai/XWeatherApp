import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Card,
  Typography,
  CardContent,
  Grid,
  Form,
} from "@mui/material";
import styles from "./WeatherApp.module.css";

function SearchBar({ setUserText, makeApiCall }) {
  const [input, setInput] = useState("");

  function handleInput(e) {
    let value = e.target.value;
    setInput(value);
    setUserText(value);
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      margin={5}
    >
      <TextField
        placeholder="Enter city name"
        required
        sx={{
          "& input": {
            padding: "10px",
          },
        }}
        onChange={handleInput}
      ></TextField>
      <Button className={styles.button} onClick={makeApiCall}>
        Search
      </Button>
    </Box>
  );
}

function WeatherCard({ title, data = "", unit="" }) {
  return (
    <Box className={"weather-card"}>
      <Card width={"25vw"}>
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data}{data? unit : null}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

function WeatherCards({ weatherData }) {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      columnGap={5}
      justifyContent={"center"}
      className={"weather-cards"}
    >
      <WeatherCard
        title={"Temperature"}
        data={weatherData.temperature}
        unit={"°C"}
      ></WeatherCard>
      <WeatherCard title={"Humidity"} data={weatherData.humidity}  unit={"%"}></WeatherCard>
      <WeatherCard
        title={"Condition"}
        data={weatherData.condition}
      ></WeatherCard>
      <WeatherCard
        title={"Wind Speed"}
        data={weatherData["wind speed"]}  unit={"k/hr"}
      ></WeatherCard>
    </Box>
  );
}

function WeatherApp() {
  const [usertext, setUserText] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [fetching, setFetching] = useState(false);
  // const [makeApiCall, setMakrApiCall] = useState(false);

  // useEffect(() => {
  //   // console.log(data);
  // }, [makeApiCall]);

  function makeApiCall() {
    setFetching(true);
    console.log(usertext);
    let data = axios
      .get("https://api.weatherapi.com/v1/current.json", {
        params: { key: "ad016ae906bb4220acf154736253105", q: usertext },
      })
      .then((data) => {
        // console.log("Weather Data:", data);
        let res = data.data;
        console.log(res);
        let weatherData = {
          temperature: res.current.temp_c,
          humidity: res.current.humidity,
          condition: res.current.condition.text,
          "wind speed": res.current.wind_kph,
        };
        setWeatherData(weatherData);
      })
      .catch((error) => {
        alert("Failed to fetch weather data");
      })
      .finally(() => {
        setFetching(false);
      });
  
  }

  return (
    <>
      <div>WeatherApp</div>
      <SearchBar
        setUserText={setUserText}
        makeApiCall={makeApiCall}
      ></SearchBar>
      {fetching ? (
        <p>Loading data...</p> 
      ) : (
        <WeatherCards weatherData={weatherData}></WeatherCards>
      )}
    </>
  );
}

export default WeatherApp;
