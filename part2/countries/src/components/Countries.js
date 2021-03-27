import React, { useState } from "react";
import CountryInfo from "./CountryInfo";

const Countries = (p) => {
  let countries = p.data.filter((d) =>
    d.name.toLowerCase().includes(p.userInput.toLowerCase())
  );
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState("");
  const api_key = p.api_key;

  const handleClick = (e) => {
    setHidden(e.target.value);
    setShow(!show);
  };
  //   console.log("hidden is equal to ", hidden);
  //   //   console.log(countries.length);
  //   console.log(countries);

  //   console.log(p.api_key);
  //   if (countries.lenth === 250) {
  //     setHidden("");
  //   }
  if (show === true && countries.length === 250) {
    setShow(false);
  }
  if (countries.length === 1) {
    let { name, capital, population, languages, flag } = countries[0];

    return (
      <CountryInfo
        name={name}
        capital={capital}
        population={population}
        languages={languages}
        flag={flag}
        api_key={api_key}
        handleClick={handleClick}
      />
    );
  } else if (countries.length < 10 && countries.length > 0) {
    let showCountry = countries.filter((country) => country.name === hidden)[0];
    return (
      <div>
        {show ? (
          <div>
            <CountryInfo
              name={showCountry.name}
              capital={showCountry.capital}
              population={showCountry.population}
              languages={showCountry.languages}
              flag={showCountry.flag}
              api_key={api_key}
              handleClick={handleClick}
            />
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              Return
            </button>
          </div>
        ) : (
          countries.map((country) => (
            <p key={country.name}>
              {country.name}{" "}
              <button value={country.name} onClick={handleClick}>
                Show
              </button>
            </p>
          ))
        )}
      </div>
    );
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
};

export default Countries;
