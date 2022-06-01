import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from '../actions/index';
import {useEffect} from 'react'

export default function DogDetail(props){ 
    console.log(props)

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

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
                    <h3>Puede medir entre {myDog[0].height.imperial} cm.</h3>
                    <h3>y pesar entre {myDog[0].weight.imperial} kg.</h3>
                </div> : <p>Loading..</p>
            }
            <Link to = '/home'>
                <button>Volver a Home</button>
            </Link>
        </div>
    )
}