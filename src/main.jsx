import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { AuthLayout } from "./components/index.js";
import {
  Home,
  Login,
  Signup,
  Problem,
  Submmission,
  AllproblemSubmissions,
  AlluserSubmissions,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/problem/:problemId",
        element: <Problem />,
        children: [
          {
            path: "submissions",
            element: <AllproblemSubmissions />,
          },
        ],
      },
      {
        path: "/submissions/user",
        element: <AlluserSubmissions />,
      },
      {
        path: "/submissions/:submissionId",
        element: <Submmission />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
