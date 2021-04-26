import React from "react";

const Notification = ({ message, errorType }) => {
  if (message === null) {
    return null;
  } else {
    if (errorType !== "Error") {
      return (
        <div
          style={{
            color: "green",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {message}
        </div>
      );
    } else {
      return (
        <div
          style={{
            color: "red",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {message}
        </div>
      );
    }
  }
};

export default Notification;
