const Filter = (p) => {
  return (
    <div>
      <form>
        <div>
          find countries{" "}
          <input value={p.userInput} onChange={p.handleInputChange} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
