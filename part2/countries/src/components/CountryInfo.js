import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = (p) => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${p.api_key}&query=${p.capital}`
      )
      .then((response) => {
        setData(response.data);
      });
  }, [p.name]);
  //   console.log("api key: ", p.api_key);
  console.log("capital data", data);

  return (
    <>
      <div>
        <h1>{p.name}</h1>
        <p>Capital: {p.capital}</p>
        <p>Population: {p.population}</p>
        <h2>Languages</h2>
        {p.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
        <br />
        <img src={p.flag} alt="flag" height={100} width="auto" />
      </div>

      <h2>Weather in {p.name}</h2>
      {data !== "" ? (
        <div>
          <div style={{ display: "inline" }}>
            <span style={{ fontWeight: "bold" }}>temperature:</span>{" "}
            {data["current"].temperature} Celsius
          </div>
          <div>
            <img src={data["current"].weather_icons[0]} />
          </div>
          <span style={{ fontWeight: "bold" }}>Wind:</span>{" "}
          {data["current"].wind_speed} mph direction {data["current"].wind_dir}
          <br />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CountryInfo;
