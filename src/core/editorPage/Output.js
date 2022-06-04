import React from "react";

const Output = (props) => {
  const { accuracyPercentage, charactersUsed, score } = props;

  return (
    <>
      <div className="editor-heading">
        <h4 className="mt-1 mb-0 text-black">OUTPUT</h4>
      </div>
      <div className="output-window">
        <iframe title="output" id="preview-window" />
      </div>
     
      <div className="mt-3">
      <div className="editor-heading">
        <h4 className=" mb-0 text-black">YOUR SCORE</h4>
      </div>
      <div className="score-window">
       <div> <h3>Accuracy: {accuracyPercentage} %</h3></div>
       <div><h3>Number of characters: {charactersUsed}</h3></div>
       <div><h3>Score: {score}</h3></div>
      </div>
      </div>
    </>
  );
};

export default Output;
