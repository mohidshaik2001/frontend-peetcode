import React from "react";

function ProblemSlot({
  problemId,
  title,
  difficulty,
  onClick,
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      className={`grid grid-cols-5 cursor-pointer hover:bg-gray-100 ${className}`}
    >
      <div className="col-span-1">
        <h1>{problemId}</h1>
        {/* {console.log("problem slot id", problemId)} */}
      </div>
      <div className="col-span-3">
        <h1>{title}</h1>
      </div>
      <div className="col-span-1">
        <h3>{difficulty}</h3>
      </div>
    </div>
  );
}

export default ProblemSlot;
