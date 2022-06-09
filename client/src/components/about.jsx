import React from "react";
import { Link, NavLink } from "react-router-dom";
import github from "../img/github.png";
import linkedin from "../img/linkedin.png";
import s from "../styles/About.module.css";

export default function About() {
  return (
    <div className={s.container}>
      <div className={s.about}>
        <h1 className={s.text}>Hello there!</h1>
        <h3 className={s.text}>
          {" "}
          Im Giovanna, a Full Stack Developer! <br />
          I made this page as an Individual Project from Soy Henry Bootcamp!{" "}
          <br />
        </h3>
        <h3 className={s.text}>Let's connect!</h3>

        <a href="https://github.com/gioantonucci">
          {" "}
          <img
            className={s.img}
            id="about"
            src={github}
            width="50"
            height="50"
            alt="img not found"
          />
        </a>

        <a href="https://www.linkedin.com/in/giovanna-antonucci/">
          <img
            className={s.img}
            id="linkedin"
            src={linkedin}
            width="50"
            height="50"
            alt="img not found"
          />
        </a>
      </div>
      <div className={s.btnDiv}>
        <NavLink to="/home">
          <button className={s.btn}> Back to home</button>
        </NavLink>
      </div>
    </div>
  );
}
