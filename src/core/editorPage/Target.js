import React from "react";
import Spinner from "../layout/Spinner";

const Target = (props) => {
  const { target, colors } = props;
  return (
    <>
      <div className="editor-heading">
        <h4 className="mt-1 mb-0 text-black">TARGET (400 * 300)</h4>
      </div>
      <div className="target-window">
        {target === undefined ? (
          <Spinner />
        ) : (
          <img src={target} alt="..." />
        )}
      </div>

      <div className="mt-3">
        <div className="editor-heading">
          <h4 className="mb-0 text-black">TARGET INFO </h4>
        </div>
        <div>
          {colors &&
            colors.split(" ").map((color, index) => (
              <div className="target-info mt-2" key={index}>
                <span className="colors">{color}</span>
                <div
                  className="target-color"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Target;
