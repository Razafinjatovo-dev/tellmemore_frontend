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
        className='responseForm_textInput'
        type="textarea"
        placeholder="Saisir votre réponse ici"
        onChange={handleTextResponseInput}
        value={responseTyped}
        // rows={100}
        // cols={100}
        // rows="100"
        // cols="100"
      />
    </div>
  );
};

export default TextArea;
