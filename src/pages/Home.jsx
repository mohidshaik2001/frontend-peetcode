import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Problem, Problems, Logo } from "../components/index.js";
function Home() {
  const status = useSelector((state) => state.auth.status);
  // console.log("status", status);
  if (!status) {
    return (
      <Container>
        <h1>HI there ,welcome to our site</h1>
        <div className="justify-center flex align-middle ">
          <Logo />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <Problems />
        </div>
        <div className="col-span-1 grid grid-cols-1 grid-rows-3">
          <div className="row-span-1">
            <h1>
              Welcome to our site! Explore various coding problems and enhance
              your skills.
            </h1>
          </div>
          <div className="row-span-2">
            <h3>
              If you have any questions or feedback, please don't hesitate to
              contact us.
            </h3>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
