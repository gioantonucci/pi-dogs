import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogs } from "../actions";
import s from '../styles/SearchBar.module.css';


export default function SearchBar() {
const [search, setSearch] = useState('');
let dispatch = useDispatch()

function onSubmit(e) {
    e.preventDefault();
    dispatch(searchDogs(search))

}

function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value)
    console.log(search)

}
    return (
        <div className={s.conteiner}>
            <form onSubmit={onSubmit}>
            <input type='text' placeholder="Buscar perrito..."  onChange={onInputChange}></input>
            <input type='submit' value='Buscar'></input>
            </form>
        </div>
    )
} 