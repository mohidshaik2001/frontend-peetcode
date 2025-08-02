import axios from "axios";
import conf from "../conf/conf.js";

export class ProblemService {
  constructor() {
    this.problemEndpoint = `${conf.app_url}/problems`;
  }

  async getProblemCount() {
    try {
      const problemsCount = await axios
        .get(`${this.problemEndpoint}/count`, { withCredentials: "include" })
        .then((res) => {
          return res.data.data;
        });
      // console.log(typeof problemsCount);
      // console.log("problem count in service", problemsCount);
      if (!problemsCount) {
        throw new Error("no problems");
      }
      return problemsCount;
    } catch (error) {
      console.log("problem count error", error);
    }
  }

  async getProblemList({ offset, limit }) {
    try {
      const problems = await axios
        .get(`${this.problemEndpoint}/list?offset=${offset}&limit=${limit}`, {
          withCredentials: "include",
        })
        .then((res) => {
          return res.data.data;
        });
      // console.log("problem list in service", problems);
      // console.log(typeof problems);
      if (!problems || problems.length === 0) {
        throw new Error("no problems");
      }
      return problems;
    } catch (error) {
      console.log("problem list error", error);
    }
  }

  async getProblem(problemId) {
    try {
      const problem = await axios
        .get(`${this.problemEndpoint}/${problemId}`, {
          withCredentials: "include",
        })
        .then((res) => {
          return res.data.data;
        });
      // console.log("problem in service", problem);
      // console.log(typeof problem);
      if (!problem) {
        throw new Error("problem not found");
      }
      return problem;
    } catch (error) {
      console.log("problem error", error.message);
    }
  }
}

const problemService = new ProblemService();
export default problemService;
