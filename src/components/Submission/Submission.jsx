import React, { useEffect, useState } from "react";
import problemService from "../../api/problem.js";

function Submission({ id, problemId, language, onClick }) {
  const [problem, setProblem] = useState({});
  useEffect(() => {
    const data = async () => {
      const problem = await problemService.getProblem(problemId);
      setProblem(problem);
    };
    data();
  }, []);
  return (
    <div className="col-span-1 " onClick={onClick}>
      <h1>{id}</h1>
      <h1>{problemId}</h1>
      <h1>{problem.title}</h1>
      <h1>{language}</h1>
    </div>
  );
}

export default Submission;
