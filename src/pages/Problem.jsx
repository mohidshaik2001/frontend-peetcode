import React from "react";
import { Container, ProblemForm } from "../components/index.js";
import { Outlet, useLocation } from "react-router-dom";

function Problem() {
  const location = useLocation();
  // Only show ProblemForm if not on a child route (i.e., exactly /problem/:problemId)
  const isBaseProblemRoute = !location.pathname.endsWith("/submissions");
  return (
    <Container>
      <div className="w-full">
        {isBaseProblemRoute && <ProblemForm />}
        <Outlet />
      </div>
    </Container>
  );
}

export default Problem;
