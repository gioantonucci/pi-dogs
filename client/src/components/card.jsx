import React from "react";
import s from '../styles/Card.module.css'



export default function Card ({name, img, temperament, weight_min, weight_max}){
 return (
     <div className={s.conteiner}>
         <h2 className={s.name}>{name}</h2>
         <img className={s.img} src={img} alt="img not found" width="350px" height="300px"/>
         <h5 className={s.temp}>{temperament}</h5>
         <h5 className={s.peso}>Entre {weight_min} y {weight_max}kg.</h5>
     </div>
 )
}
