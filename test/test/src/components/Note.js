import React from "react";

const Note = ({ note }) => {
  return (
    <li>
      {note.content} <button>Delete</button>
    </li>
  );
};

export default Note;
