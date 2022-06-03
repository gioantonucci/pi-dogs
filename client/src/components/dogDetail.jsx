import React from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getClean, getDetail} from '../actions';
import {useEffect} from 'react'
import s from '../styles/dogDetail.module.css'

export default function DogDetail(){ 
  
    const myDog = useSelector ((state) => state.detail)
    const dispatch = useDispatch();
    
    const { id } = useParams();

    console.log(id)

    useEffect(()=> {
        dispatch(getDetail(id));
        dispatch(getClean());
    }, [dispatch, id])

    
    console.log(myDog)
    return (
        
        <div className = {s.contiener}>
           
            {
                myDog.length > 0 ?
                <div className={s.card}>
                    <h1 className={s.title}>Este es {myDog[0].name}</h1>
                    <img className={s.img} alt='img not found' src= {myDog[0].image? myDog[0].image : myDog[0].img}/>
                    <h2 className={s.text}>Su esperanza de vida es de entre {myDog[0].life_time_min} y {myDog[0].life_time_max} años.</h2>
                    <h2 className={s.text}>Sus temperamentos son {myDog[0].temperament}.</h2>
                    <h3 className={s.text}>Puede medir entre {myDog[0].height_min} y {myDog[0].height_max} cm.</h3>
                    <h3 className={s.text}>y pesar entre {myDog[0].weight_min} y {myDog[0].weight_max}kg.</h3>
                </div> : <p className={s.loading}>Loading..</p>
            }
             <Link to = '/home'>
                <button className={s.btn}>Volver a Home</button>
            </Link>
            
        </div>
    )
}