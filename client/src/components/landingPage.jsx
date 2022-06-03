import React from "react";
import {Link} from "react-router-dom"
import s from '../styles/LandingPage.module.css'

export default function LandingPage(){
    return (
    <div className={s.conteiner}>
        <div className={s.div}>
        <h1 className={s.title}>Guau guau?</h1>
        <Link to="/home">
            <button className={s.btn}>GUAU!</button>
        </Link>
        </div>
    </div>
    )
}