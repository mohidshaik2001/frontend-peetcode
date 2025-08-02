import React from "react";

function TestBox({ result, ...rest }) {
  return (
    <div className={`${rest.className}`}>
      <h1>{result}</h1>
    </div>
  );
}

export default TestBox;
