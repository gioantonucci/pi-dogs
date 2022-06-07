import React from "react";
import { Link } from "react-router-dom";
import doggie from "../img/error.png"
import s from '../styles/errorNotFound.module.css'



export default function Err(){
 return (

     <div className={s.container}>
         <div className={s.SACALEELPADDING}>
         <h1 className={s.text}>Error 404 Not found!</h1>
         <h2 className={s.text1}> There are no puppies here 👀</h2>
         </div>
        <div className={s.btnDiv}>
        <Link to="/home">
        <button className={s.btn}> Back to home</button>
        </Link>
        </div>
         <img className={s.img} src={doggie} />
        
     </div>
 )
}
