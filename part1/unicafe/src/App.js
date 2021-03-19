import React, { useState } from "react";
import "./index.css";

const Button = (props) => {
  return (
    <button onClick={() => props.setF(props.value + 1)}>{props.text}</button>
  );
};

const Statistics = (props) => {
  // let average = (props.good - props.bad) / props.total;
  // let positive = props.good / props.total;
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let total = good + bad + neutral;
  let average = (good - bad) / total;
  let positive = (good / total) * 100;
  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <Button setF={setGood} value={good} text="good" />
        <Button setF={setNeutral} value={neutral} text="neutral" />
        <Button setF={setBad} value={bad} text="bad" />

        <h1>Statistics</h1>
        {total ? (
          <>
            <table>
              <tbody>
                <Statistics text="good" value={good} />
                <Statistics text="neutral" value={neutral} />
                <Statistics text="bad" value={bad} />
                <Statistics text="all" value={total} />
                <Statistics text="average" value={average} />
                <Statistics text="positive" value={positive + " %"} />
              </tbody>
            </table>
          </>
        ) : (
          <p>No feedback given</p>
        )}
      </div>
    </>
  );
};

export default App;
