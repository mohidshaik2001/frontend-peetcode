import axios from "axios";
import conf from "../conf/conf.js";

export class SubmissionService {
  constructor() {
    this.submissionEndpoint = `${conf.app_url}/submissions`;
  }

  async getUserSubmissions() {
    try {
      const submissions = await axios
        .get(`${this.submissionEndpoint}/user`, {
          withCredentials: "include",
        })
        .then((res) => {
          console.log("res.data.data from api", res.data.data);
          return res.data.data;
        })

        .catch((error) => console.log(error));
      return submissions;
    } catch (error) {
      console.log("user submissions error", error);
    }
  }
  async getProblemSubmissions({ problemId }) {
    try {
      console.log(
        " step 2 problemId in get problem submissions api",
        problemId
      );
      const submissions = await axios
        .get(`${this.submissionEndpoint}/problem/${problemId}`, {
          withCredentials: "include",
        })
        .then((res) => {
          console.log("step 3 prosubs from api", res.data.data);
          return res.data.data;
        })
        .catch((error) => console.log(error));
      return submissions;
    } catch (error) {
      console.log("problem submissions error", error);
    }
  }

  async submitSubmission({ problemId, code, language }) {
    try {
      const submission = await axios
        .post(
          `${this.submissionEndpoint}/submit`,
          {
            problemId,
            code,
            language,
          },
          {
            withCredentials: "include",
          }
        )
        .then((res) => {
          console.log("step 2 res.data.data from api", res.data.data);
          return res.data.data;
        })
        .catch((error) => console.log(error));
      return submission;
    } catch (error) {
      console.log("submit submissions error", error);
    }
  }
  async getSubmission(submissionId) {
    try {
      console.log("submissionId in get submission api", submissionId);
      const submission = await axios
        .get(`${this.submissionEndpoint}/submission/${submissionId}`, {
          withCredentials: "include",
        })
        .then((res) => {
          console.log("res.data.data from api", res.data.data);
          return res.data.data;
        })
        .catch((error) => console.log(error));
      return submission;
    } catch (error) {
      console.log("get submission error", error);
    }
  }
}

const submissionService = new SubmissionService();

export default submissionService;
