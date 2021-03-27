import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="">
      <h1>Find the country</h1>
      <Filter userInput={userInput} handleInputChange={handleInputChange} />
      <Countries data={data} userInput={userInput} api_key={api_key} />
    </div>
  );
}

export default App;
