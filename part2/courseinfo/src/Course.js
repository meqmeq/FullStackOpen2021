import React from "react";

const Course = (props) => {
  let { courses } = props;
  const total = (part) => part.reduce((s, p) => s + p.exercises, 0);
  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map((part) => {
            return (
              <div key={part.id}>
                <p>
                  {part.name} {part.exercises}
                </p>
              </div>
            );
          })}
          <p style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
            total of {total(course.parts)} exercises
          </p>
        </div>
      ))}
    </>
  );
};

export default Course;
