import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import submissionService from "../../api/submission.js";
import problemService from "../../api/problem.js";
import { Problem } from "../index.js";

function SubmissionForm() {
  const submissionId = useParams().submissionId;
  console.log("submissionId in component submissionForm", submissionId);
  const [submission, setSubmission] = useState({});
  const [problem, setProblem] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const sub = async () => {
      const sub = await submissionService.getSubmission(submissionId);
      console.log("submission in component submissionForm", sub);
      setSubmission(sub);
      const problem = await problemService.getProblem(sub.problemId);
      setProblem(problem);
    };
    sub();

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <Problem
          problemId={problem.problemId}
          title={problem.title}
          description={problem.description}
          testcase={problem.testcase}
          testcaseAnswer={problem.testcaseAnswer}
          difficulty={problem.difficulty}
        />
      </div>
      <div className="col-span-4 grid grid-cols-1">
        <p>{submission.code}</p>
      </div>
    </div>
  );
}

export default SubmissionForm;
