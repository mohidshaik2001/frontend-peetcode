import React from "react";
import { useEffect, useState } from "react";
import { Container, Submissions } from "../components/index.js";
import { useParams } from "react-router-dom";
import submissionService from "../api/submission.js";
import { useSelector } from "react-redux";
function AllproblemSubmissions() {
  const status = useSelector((state) => state.auth.status);
  const problemId = useParams().problemId;
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!status) return;
    setLoading(true);
    const data = async () => {
      console.log("step 1 in component all problem submissions", problemId);
      await submissionService
        .getProblemSubmissions({
          problemId,
        })
        .then((res) => {
          setSubmissions(res);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    data();
  }, [status, problemId]);
  if (!status) return null;
  if (loading)
    return (
      <Container>
        <h1>Loading.....</h1>
      </Container>
    );
  return (
    <Container>
      <div className="w-full">
        <Submissions submissions={submissions} />
      </div>
    </Container>
  );
}

export default AllproblemSubmissions;
