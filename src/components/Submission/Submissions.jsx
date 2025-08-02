import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import submissionService from "../../api/submission.js";
import Submission from "./Submission.jsx";
import { useNavigate } from "react-router-dom";
function Submissions({ submissions }) {
  const navigate = useNavigate();
  const onclickHandler = (id) => {
    navigate(`/submissions/${id}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {submissions.map((submission) => (
        <Submission
          key={submission.id}
          id={submission.id}
          problemId={submission.problemId}
          language={submission.language}
          onClick={() => onclickHandler(submission.id)}
        />
      ))}
    </div>
  );
}

export default Submissions;
