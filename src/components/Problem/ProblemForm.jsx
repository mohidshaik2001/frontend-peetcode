import React from "react";
import { useParams } from "react-router-dom";
import { Problem, TestBox, RTE, Input, Language } from "../index.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import problemService from "../../api/problem.js";
import submissionService from "../../api/submission.js";
function ProblemForm() {
  const problemId = useParams().problemId;
  const navigate = useNavigate();
  const [problem, setProblem] = useState({});
  const [result, setResult] = useState({});
  const { register, handleSubmit, control } = useForm();
  const submit = async (data) => {
    console.log("step 1 in submit", data);
    const res = await submissionService.submitSubmission({
      problemId,
      code: data.code.replace(/<[^>]*>/g, ""),
      language: data.language,
    });
    console.log("step 3 res from api", res);
    setResult(res);
  };
  const clickHandler = (problemId) => {
    console.log("clciked");
    navigate(`/problem/${problemId}/submissions`);
  };
  useEffect(() => {
    const data = async () => {
      const problem = await problemService.getProblem(problemId);
      console.log("problem in component", problem);
      console.log(typeof problem);
      setProblem(problem);
    };
    data();
  }, []);
  return (
    <div className="flex flex-grid w-full h-full gap-2">
      <div className="w-1/5 h-2/3">
        <Problem {...problem} />
        <div>
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => clickHandler(problem.id)}
          >
            View Submissions
          </button>
        </div>
      </div>

      <div className="flex flex-col w-4/5 h-full">
        <form onSubmit={handleSubmit(submit)}>
          <div className=" h-1/20 w-full">
            <Language
              name="language"
              label="Language"
              defaultValue={"java"}
              className=" h-1/20"
              register={register}
            />
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="h-15/20 w-full">
            <RTE
              name="code"
              label="Code"
              control={control}
              defaultValue={problem.code || ""}
              className=" h-15/20"
            />
          </div>
        </form>

        <div className="h-4/20 bg-amber-300 w-full">
          <TestBox
            result={JSON.stringify(result)}
            className="col-span-1 h-1/20"
          />
        </div>
      </div>
    </div>
  );
}

export default ProblemForm;
