import "./App.css";
import axios from "axios";

const promise = axios.get("http://localhost:3001/notes");

axios.get("http://localhost:3001/notes").then((response) => {
  const notes = response.data;
  console.log(notes);
});

function App() {
  return (
    <div>
      <p>hello</p>
    </div>
  );
}

export default App;
