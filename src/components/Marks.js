import React from "react";

const Marks = ({ setResponseTyped }) => {
  const handleMarkResponseInput = (event) => {
    // Save keyed in response
    setResponseTyped(event.target.value);
  };
  return (
    <div style={{ display: "flex" }}>
      <button value={1} onClick={handleMarkResponseInput}>
        1
      </button>
      <button value={2} onClick={handleMarkResponseInput}>
        2
      </button>
      <button value={3} onClick={handleMarkResponseInput}>
        3
      </button>
      <button value={4} onClick={handleMarkResponseInput}>
        4
      </button>
      <button value={5} onClick={handleMarkResponseInput}>
        5
      </button>
    </div>
  );
};

export default Marks;
