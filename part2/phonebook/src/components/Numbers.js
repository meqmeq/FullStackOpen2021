import React from "react";
import personService from "../services/Service";

const Numbers = ({ person, setMessage }) => {
  const test = (e) => {
    window.confirm(`Delete ${person.name} ?`)
      ? personService
          .deletePerson(person.id)
          .catch((error) => {
            setMessage(`Testing ${error}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .then(window.location.reload())
      : console.log("is not delete");
  };

  return (
    <p>
      {person.name} {person.number} <button onClick={test}>delete</button>
    </p>
  );
};

export default Numbers;
