import React from "react";

const TextArea = ({
  // questionData,
  // responsesList,
  // setResponsesList,
  responseTyped,
  setResponseTyped,
}) => {
  const handleTextResponseInput = (event) => {
    // Save keyed in response
    setResponseTyped(event.target.value);
  };
  return (
    <div>
      <input
        type="textarea"
        placeholder="Répondre ici"
        onChange={handleTextResponseInput}
        value={responseTyped}
      />
    </div>
  );
};

export default TextArea;
