import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Card, Typography,  CardContent, Grid} from "@mui/material";
import styles from "./WeatherApp.module.css";

function SearchBar() {
  const [input, setInput] = useState("");

  function handleInput(e){
     setInput(e.target.value);
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
      <Button className={styles.button} >Search</Button>
    </Box>
  );
}

function WeatherCard({title, data}) {
  return <Box>

      <Card width={"25vw"}>
         <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                hfllkd;ks
              </Typography>
            </CardContent>
      </Card>
  </Box>;
}

function WeatherCards(){
  return(
    <Box display={"flex"} flexWrap={"wrap"} columnGap={5} justifyContent={"center"}  >

      <WeatherCard title={"Temperature"}></WeatherCard>
       <WeatherCard title={"Humidity"}></WeatherCard>
        <WeatherCard title={"Condition"}></WeatherCard>
         <WeatherCard title={"Wind Speed"}></WeatherCard>
    </Box>

  );
}

function WeatherApp() {

  const [usertext, setUserText] = useState("");
  
  useEffect(()=>{

    
  },[]);

  return (
    <>
      <div>WeatherApp</div>
      <SearchBar ></SearchBar>
      <WeatherCards></WeatherCards>
    </>
  );
}

export default WeatherApp;
