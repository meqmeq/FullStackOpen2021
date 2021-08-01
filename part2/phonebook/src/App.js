import React, { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";
import personService from "./services/Service";

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
          <Numbers key={person.id} person={person} setMessage={p.setMessage} />
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
  const [message, setMessage] = useState(null);
  const [errorType, setErrorType] = useState("");
  console.log(errorType);
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setMessage(`Number of ${error} changed`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }, []);

  const handleFilterNameChange = (e) => {
    setFilterName(e.target.value);
  };

  const addPerson = (e) => {
    if (errorType === "Error") {
      setErrorType("");
    }
    const personValue = persons.filter((person) => person.name === newName);
    const personObject = {
      name: newName,
      number: newNumber,
    };
    // console.log(personObject);
    // console.log(personValue[0].id);
    if (persons.filter((person) => person.name === newName).length > 0) {
      e.preventDefault();

      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
        ? personService
            .update(personValue[0].id, personObject)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== personValue[0].id ? person : returnedPerson
                )
              );
              setMessage(`Number of ${returnedPerson.name} changed`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
            .catch((error) => {
              setErrorType("Error");
              setMessage(
                `Information of ${newName} has already been removed from server `
              );
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
        : console.log("Cancelled");
    } else {
      e.preventDefault();
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setMessage(`Added ${newPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          setErrorType("Error");
          setMessage(`${error.response.data.error}`);
          console.log(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      console.log(personObject);
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  // console.log(persons.filter((person) => person.name === newName));
  // console.log(newNumber);
  // console.log(newName);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorType={errorType} />
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

      <Persons
        persons={persons}
        filterName={filterName}
        setMessage={() => setMessage()}
      />
    </div>
  );
};

export default App;
