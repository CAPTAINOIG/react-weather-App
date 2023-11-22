import axios from "axios";
import React, { useState } from "react";

const Weatherapp = () => {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState(null);
  const [iconUrl, setIconUrl] = useState("");
  console.log(info);

  const checkweather = () => {
    let APIkey = "ee26ec43891666e8d4e8069a734cddff";
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

    axios.get(endpoint)
    .then((response) => {
      // console.log(response.data)
      setInfo(response.data);

      const iconCode = response.data.weather[0].icon;
      let iconEndpoint = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      axios.get(iconEndpoint).then((data) => {
        setIconUrl(data.config.url);
        console.log(iconUrl);
      });
    });
  };
  return (
    <>
      <div className="col-lg-3 ms-lg-5 mt-5 bg-success">
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Enter City Name"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={checkweather}>
            🔍</button>
        </div>
      </div>

      {info !== null ? (
        <>
          <div className="">
            <img />
            <div className="ms-5 text-primary fw-bold">
              <h5 className=""></h5>
              <img src={iconUrl} alt="Weather Icon" />
              <p className="fs-1">Location: {info.name}</p>
              <p className="fs-1">Country:{info.sys.country}</p>
              <p className="fs-1">Speed: {info.wind.speed}m/s</p>
              <p className="fs-1">Temperature: {Math.ceil(info.main.temp)}°C</p>
              <p className="fs-1">Latitude:{info.coord.lat}</p>
              <p className="fs-1">Longitude:{info.coord.lon}</p>
              <p className="fs-1">Wind Degree:{info.wind.deg}</p>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Weatherapp;
