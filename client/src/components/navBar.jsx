import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/NavBar.module.css";
import SearchBar from "./searchBar";
import about from "../img/about.png";
import home from "../img/home.png";

export default function NavBar() {
  return (
    <header>
      <nav className={s.navbar}>
        <Link exact to="/home">
          <img
            className={s.imgHome}
            id="home"
            src={home}
            width="50"
            height="50"
            alt="img not found"
          />
        </Link>
        <Link exact to="/about">
          <img
            className={s.imgHome}
            id="about"
            src={about}
            width="50"
            height="50"
            alt="img not found"
          />
        </Link>
        <div className={s.btnDiv}>
          <Link to="/dog">
            <button className={s.btn}>Create dog!</button>
          </Link>
        </div>
        <SearchBar />
      </nav>
    </header>
  );
}
