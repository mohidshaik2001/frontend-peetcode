import React from "react";

function Problem({
  problemId,
  title,
  description,
  testcase,
  testcaseAnswer,
  difficulty,
}) {
  return (
    <div className="col-span-1 flex flex-col w-full border border-gray-600">
      <div className="h-1/6">
        <h1 className="font-bold bg-gray-600">{problemId}</h1>
      </div>
      <div className="h-1/6">
        <h1 className="font-bold bg-gray-600">Title</h1>
        <p>{title}</p>
      </div>
      <div className="h-1/6">
        <h1 className="font-bold bg-gray-600">Description</h1>
        <p>{description}</p>
      </div>
      <div className="h-1/6">
        <h1 className="font-bold bg-gray-600">Testcase</h1>
        <p>{testcase}</p>
      </div>
      <div className="h-1/6">
        <h1 className="font-bold bg-gray-600">Testcase Answer</h1>
        <p>{testcaseAnswer}</p>
      </div>
      <div className="h-1/6">
        <h1 className="font-bold bg-gray-600">Difficulty</h1>
        <p>{difficulty}</p>
      </div>
    </div>
  );
}

export default Problem;
