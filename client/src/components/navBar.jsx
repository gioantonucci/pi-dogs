import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/NavBar.module.css";
import SearchBar from "./searchBar";

export default function NavBar() {
  return (
    <header>
      <nav className={s.navbar}>
        <Link exact to="/">
          <img
            className={s.imgHome}
            id="home"
            src={"https://cdn-icons-png.flaticon.com/512/1064/1064041.png"}
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
