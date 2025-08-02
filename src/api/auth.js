import conf from "../conf/conf.js";
import axios from "axios";
import { login, logout } from "../store/authslice.js";
export class AuthService {
  constructor() {
    this.userEndpoint = `${conf.app_url}/users`;
    //   (this.problemEndpoint = `${conf.app_url}/problems`),
    //   (this.submissionEndpoint = `${conf.app_url}/submissions`);
  }

  async createAccount({ email, username, fullname, password }) {
    try {
      const createdUser = await axios
        .post(`${this.userEndpoint}/register`, {
          email: email,
          username: username,
          fullname: fullname,
          password: password,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log(error));

      if (createdUser) {
        return this.loginUser({ username: username, password: password });
      } else {
        return createdUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser({ password, email, username }) {
    try {
      const loginResponse = await axios
        .post(
          `${this.userEndpoint}/login`,
          {
            password: password,
            email: email || undefined,
            username: username || undefined,
          },
          {
            withCredentials: "include",
          }
        )
        .then((res) => {
          return res.data.data;
        })
        .catch((error) => console.log(error));

      if (loginResponse) {
        return loginResponse;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log("error login user::", error);
    }
  }
  async logoutUser() {
    try {
      await axios
        .post(
          `${this.userEndpoint}/logout`,
          {},
          {
            withCredentials: "include", // if you use cookies for auth
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log("error logout user::", error));
    } catch (error) {
      console.log("userlogout erroe::", error);
    }
  }

  async refreshToken() {
    try {
      const accessToken = await axios
        .get(`${this.userEndpoint}/refresh-token`)
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log("refresh token error::", error);
    }
  }
  async getCurrentUser() {
    try {
      // If you store your token in localStorage, retrieve it

      const response = await axios.get(`${this.userEndpoint}/me`, {
        withCredentials: "include", // if you use cookies for auth
      });
      // console.log("response", response);
      if (!response) {
        return null;
      }
      return response.data; // Adjust if your backend returns user differently
    } catch (error) {
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
