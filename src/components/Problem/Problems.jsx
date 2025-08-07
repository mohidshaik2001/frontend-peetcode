import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import problemService from "../../api/problem.js";
import ProblemSlot from "./ProblemSlot.jsx";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function Problems() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [problems, setProblems] = useState([]);
  const clickHandler = (problemId) => {
    navigate(`/problem/${problemId}`);
  };
  useEffect(() => {
    const data = async () => {
      const problemCount = await problemService
        .getProblemCount()
        .then((res) => {
          return res.count;
        });
      // console.log("problem count in problems", problemCount);
      // console.log(typeof problemCount);
      setCount(problemCount);
    };
    data();
  }, []);
  useEffect(() => {
    const data = async () => {
      const problemList = await problemService.getProblemList({
        offset: (page - 1) * limit,
        limit: limit,
      });
      if (Array.isArray(problemList)) {
        setProblems(problemList);
      } else {
        console.error("expected array got", problemList);
      }
    };
    data();
  }, [page]);

  return (
    <div className="w-full h-full grid grid-cols-1 grid-rows-14  gap-4">
      <div className="col-span-1 row-span-2 grid grid-cols-6">
        <div className="col-span-1">
          <h1>Problem ID</h1>
        </div>
        <div className="col-span-4">
          <h1>Title</h1>
        </div>
        <div className="col-span-1">
          <h3>Difficulty</h3>
        </div>
      </div>

      {problems.map((problem) => (
        <ProblemSlot
          onClick={() => clickHandler(problem.id)}
          className="col-span-1 row-span-1"
          key={problem.id}
          problemId={problem.id}
          title={problem.title}
          difficulty={problem.difficulty}
        />
      ))}
      {count > 0 && (
        <div className="col-span-1 row-span-2">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(count / limit)}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Problems;
