import  {React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import s from '../styles/postDog.module.css';


//---------------VALIDACION DE ERRORES EN LOS INPUTS------------------------
function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = "Te olvidaste del nombre!";
    }
    if(!input.height_min) {
        errors.height_min = "Falta el tamaño mínimo!"
    }
    if(input.height_max <= input.height_min) {
        errors.height_max = "El valor mínimo no puede ser mayor al máximo!"
    }
    if(!input.weight_min) {
        errors.weight_min = "Falta el peso máximo!"
    }
    if(input.weight_max <= input.weight_min) {
        errors.height_max = "El mínimo no puede ser mayor al máximo!" 
    }
    if(!input.life_span_min) {
        errors.life_span_min = "Falta el mínimo!"
    }
    if(input.life_time_max <= input.life_time_min) {
        errors.life_span_max = "El valor mínimo no puede ser mayor al máximo!"
    }
    if(input.temperaments.length < 1 ){
        errors.temperaments = "Tu perrito requiere al menos un temperamento!"
    }
    if(input.temperaments.length >= 3 ){
        errors.temperaments = "Tu perrito puede tener hasta 3 temperamentos!"
    
    } return errors 
}

//-------------------------------------------------------------------------------


export default function PostDog() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})


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
      
    console.log(temperaments)
    console.log(temperaments.state)
    //al estado input ademas de lo que tiene le agrega el e.target.value de lo que este modificando
    //va llenando el estado que planteamos arriba
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.name
        }));
        console.log(input)
    };

    function handleSelect(e) {
        setInput ({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }
    function handleDelete(el){
        setInput({
            ...input,
            temperaments: 
            input.temperaments.filter(e=> e !== el)
        })
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
         dispatch(postDog(input))
            alert("Done!")
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
            <Link to= '/home'><button className={s.btn}> Back to home</button></Link>
            <h1 className={s.title}>Create a new dog!</h1>
            <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
            <p className={s.obligatorio}>* : Required</p>
{/*--------INPUTS-------------------------------------------------------*/}         
{/*--------raza---------------------------------------------------------*/}
                <div className={s.row}>
                <label className={s.label}>*Breed:</label>
                <input className={s.inputl}
                type='text'
                value={input.name}
                name="name"
                id='name' 
                placeholder="Enter the breed..."
                onChange={(e) =>handleChange(e)}
                />
               {errors.name && (<p className={s.error}>{errors.name}</p>)}
                </div>
{/*--------tamaño-----------------------------------------------------------------*/}        
                <div className={s.row}>
                <label className={s.label}>*Size</label>
                <br/>
                <input className={s.input} 
                type="number" 
                min="1" max="100"
                value={input.height_min} 
                name='height_min' 
                id='height_min'  
                placeholder="Min" 
                onChange={(e)=>handleChange(e)}/>
                cm.
                {errors.height_min && (<p className= {s.error} >{errors.height_min}</p>)}
                <label></label>
                <input className={s.input}
                type="number" 
                min="1" max="100"
                value={input.height_max} 
                name='height_max' 
                id='height_max'  
                placeholder="Max"
                onChange={(e)=>handleChange(e)}/>
                cm.
                {errors.height_max && (<p className= {s.error} >{errors.height_max}</p>)}
                </div>
{/*-------peso------------------------------------------------------------------*/}               
                <div className={s.row}>
                <label className={s.label}>*Weight:</label>
                <br/>
                <input className={s.input}
                type='number'
                min="1" max="100"
                value={input.weight_min}
                name="weight_min"
                id= 'weight_min'
                placeholder="Min"
                onChange={(e) =>handleChange(e)}
                />
                kg.
                {errors.weight_min && (<p className={s.error}>{errors.weight_min}</p>)}
                <label className={s.label}></label>
                <input className={s.input}
                type='number'
                min="1" max="100"
                value={input.weight_max}
                name="weight_max"
                id="weight_max"
                placeholder="Max"
                onChange={(e) =>handleChange(e)}
                />
                kg.
                {errors.weight_max && (<p className={s.error}>{errors.weight_max}</p>)}
                </div>
{/*-------años-----------------------------------------------------------------*/}        
                <div className={s.row}>
                <label className={s.label}>*Lifespan:</label>
                <br/>
                <input className={s.input}
                min="1" max="100"
                type='number'
                value={input.life_span_min}
                name="life_span_min"
                id= "life_span_min"
                placeholder="Min"
                onChange={(e) =>handleChange(e)}
                /> año/s.
                {errors.life_span_min && (<p className={s.error}>{errors.life_span_min}</p>)}
                <label className={s.label}></label>
                <input className={s.input}
                min="1" max="100"
                type='number'
                value={input.life_span_max}
                name="life_span_max"
                id="life_span_max"
                placeholder="Max"
                onChange={(e) =>handleChange(e)}
                /> años.
                {errors.life_span_max && (<p className={s.error}>{errors.life_span_max}</p>)}
                </div>
{/*------imagen----------------------------------------------------------------*/}                
                <div className={s.row}>
                    <label className={s.label}>Image:</label>
                    <input type='imagen'
                    className={s.inputl}
                    value={input.image}
                    name="image"
                    placeholder="URL"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
{/*------temperamentos-----------------------------------------------------*/}
                <div className={s.row}>
                    <label className={s.label}>*Temperaments:</label>
                    {errors.temperaments && (<p className= {s.error} >{errors.temperaments}</p>)}
                    <select className={s.select}onChange={(e)=> handleSelect(e)}> 
                        {temperaments.map((temp) => (
                            <option value={temp.name} key={temp.id}>{temp.name}</option>
                        ))}
                    </select>
                    <ul className={s.ul}><li className={s.li} key={'key'}>{input.temperaments.map(el => <button className={s.botonTemp} type='button' key={el.id} onClick={()=>handleDelete(el)}>{el}</button>)}</li></ul>
                </div>
                
                <button className={s.btn}type='submit'>Create!</button>
            </form>
        </div>
    )
}
