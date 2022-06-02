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
                <div>
                    <h1>Este es {myDog[0].name}</h1>
                    <img alt='img not found' src= {myDog[0].image? myDog[0].image : myDog[0].img}/>
                    <h2>Su esperanza de vida es de entre {myDog[0].life_time_min} y {myDog[0].life_time_max} años.</h2>
                    <h2>Sus temperamentos son {myDog[0].temperament}.</h2>
                    <h3>Puede medir entre {myDog[0].height_min}cm y {myDog[0].height_max} cm.</h3>
                    <h3>y pesar entre {myDog[0].weight_min}kg y {myDog[0].weight_max}kg</h3>
                </div> : <p>Loading..</p>
            }
            <Link to = '/home'>
                <button>Volver a Home</button>
            </Link>
        </div>
    )
}