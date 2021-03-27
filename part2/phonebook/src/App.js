import React, { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import axios from "axios";

const Filter = (props) => {
  return (
    <div>
      <form>
        filter shown with{" "}
        <input
          value={props.filterName}
          onChange={props.handleFilterNameChange}
        />
      </form>
    </div>
  );
};

const PersonForm = (p) => {
  return (
    <form onSubmit={p.addPerson}>
      <div>
        name: <input value={p.newName} onChange={p.handleNameChange} />
      </div>
      <div>
        number: <input value={p.newNumber} onChange={p.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (p) => {
  return (
    <div>
      {p.persons.map((person) =>
        person.name.includes(p.filterName) ? (
          <Numbers key={person.name} person={person} />
        ) : (
          <p></p>
        )
      )}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleFilterNameChange = (e) => {
    setFilterName(e.target.value);
  };

  const addPerson = (e) => {
    if (persons.filter((person) => person.name === newName).length > 0) {
      e.preventDefault();
      alert(`${newName} is already added to phonebook`);
    } else {
      e.preventDefault();
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNumber("");
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
      />

      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {/* {persons.map((person) =>
        person.name.includes(filterName) ? (
          <Numbers key={person.name} person={person} />
        ) : (
          <></>
        )
      )} */}
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
