import React from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from '../actions';
import {useEffect} from 'react'

export default function DogDetail(){ 
  

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(()=> {
        dispatch(getDetail(id));
    }, [dispatch, id])

    const myDog = useSelector ((state) => state.detail)

    return (
        <div>
            {
                myDog.length>0?
                <div>
                    <h1>Este es {myDog[0].name}</h1>
                    <img alt='img not found' src= {myDog[0].image? myDog[0].image : myDog[0].img}/>
                    <h2>Su esperanza de vida es de {myDog[0].life_span}</h2>
                    <h2>Sus temperamentos son {myDog[0].temperament}</h2>
                    <h3>Puede medir entre {myDog[0].height} cm.</h3>
                    <h3>y pesar entre {myDog[0].weight} kg.</h3>
                </div> : <p>Loading..</p>
            }
            <Link to = '/home'>
                <button>Volver a Home</button>
            </Link>
        </div>
    )
}