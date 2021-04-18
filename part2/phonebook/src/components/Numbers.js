import React from "react";
import personService from "../services/Service";

const Numbers = ({ person }) => {
  const test = (e) => {
    window.confirm(`Delete ${person.name} ?`)
      ? personService.deletePerson(person.id).then(window.location.reload())
      : console.log("is not delete");
  };

  return (
    <p>
      {person.name} {person.number} <button onClick={test}>delete</button>
    </p>
  );
};

export default Numbers;
