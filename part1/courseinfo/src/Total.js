const Total = (props) => {
  let ans = 0;
  for (let i = 0; i < props.parts.length; i++) {
    ans += props.parts[i].exercises;
  }

  console.log(ans);
  return (
    <>
      <p>
        <p>Number of exercises {ans}</p>
      </p>
    </>
  );
};

export default Total;
