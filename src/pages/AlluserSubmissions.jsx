import React from "react";
import { useEffect, useState } from "react";
import { Container, Submissions } from "../components/index.js";
import { useSelector } from "react-redux";
import submissionService from "../api/submission.js";
import { set } from "react-hook-form";
function AlluserSubmissions() {
  const status = useSelector((state) => state.auth.status);
  console.log("status in component", status);
  const [submissions, setSubmissions] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("submissions in component", submissions);
  console.log(typeof submissions);
  useEffect(() => {
    if (!status) return;

    setLoading(true);
    const data = async () => {
      await submissionService
        .getUserSubmissions()
        .then((res) => {
          console.log("res in component", res);
          setSubmissions(res);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    data();
  }, [status]);
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

export default AlluserSubmissions;
