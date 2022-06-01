import  {React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import s from '../styles/postDog.module.css';


export default function PostDog() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments)

    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_time_min: "",
        life_time_max: "",
        temperaments: [],
        img:""
    })
      
    //al estado input ademas de lo que tiene le agrega el e.target.value de lo que este modificando
    //va llenando el estado que planteamos arriba

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    };

    function handleSelect(e) {
        setInput ({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert("Perrito creado!")
        setInput({
            name: "",
            height_min: "",
            height_max: "",
            weight_min: "",
            weight_max: "",
            life_span: "",
            temperaments: []
        })
       history.push('/home')
    }


    useEffect (() => {
        dispatch(getTemperaments());
    }, []);


    return (
        <div className={s.conteiner}>
            <Link to= '/home'><button className={s.btn}> Volver a home</button></Link>
            <h1 className={s.title}>Crea un nuevo perrito!</h1>
            <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={s.row}>
                    <label className={s.label}>Raza:</label>
                    <input className={s.input}
                    type='text'
                    value={input.name}
                    name="name"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <div className={s.row}>
                    <label className={s.label}>Peso mínimo:</label>
                    <input className={s.input}
                    type='number'
                    value={input.weight_min}
                    name="weight_min"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <div className={s.row}>
                    <label className={s.label}>Peso máximo:</label>
                    <input className={s.input}
                    type='number'
                    value={input.weight_max}
                    name="weight_max"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <div className={s.row}>
                    <label className={s.label}>Altura mínima:</label>
                    <input className={s.input}
                    type='number'
                    value={input.height_min}
                    name="height_min"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <div className={s.row}>
                    <label className={s.label}>Altura máxima:</label>
                    <input className={s.input}
                    type='number'
                    value={input.height_max}
                    name="height_max"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <div className={s.row}>
                    <label className={s.label}>Años de vida mínimos:</label>
                    <input className={s.input}
                    type='number'
                    value={input.life_span_min}
                    name="life_span_min"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <div className={s.row}>
                    <label className={s.label}>Años de vida máximos:</label>
                    <input className={s.input}
                    type='number'
                    value={input.life_span_max}
                    name="life_span_max"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <div className={s.row}>
                    <label className={s.label}>Imagen:</label>
                    <input type='imagen'
                    className={s.input}
                    value={input.image}
                    name="image"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <div className={s.row}>
                    <select onChange={(e)=> handleSelect(e)}>
                        {temperaments.map((temp) => (
                            <option value={temp.name}>{temp.name}</option>
                        ))}
                    </select>
                    <ul><li key={'key'}>{input.temperaments.map(el => el + ", ")}</li></ul>
                </div>
                <button className={s.btn}type='submit'>Crear!</button>
            </form>
        </div>
    )
}