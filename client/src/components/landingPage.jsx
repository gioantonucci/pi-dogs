import React from "react";
import {Link} from "react-router-dom"
import s from '../styles/LandingPage.module.css'

export default function LandingPage(){
    return (
    <div className={s.conteiner}>
        <h1>GUAU GUAU?</h1>
        <Link to="/home">
            <button className={s.btn}>GUAU!</button>
        </Link>
    </div>
    )
}