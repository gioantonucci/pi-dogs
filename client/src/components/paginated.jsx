import React from 'react';
import currentPage from './home'
import s from '../styles/Paginated.module.css';


export default function Paginated({dogsPerPage, currentPage, allDogs, paginado}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }
    return(
    <nav className={s.nav}>
        <ul className={s.paginated}>
            {pageNumbers &&
            pageNumbers.map(number=> (
           <li className={s.number} key={number}>
                 <p className= {currentPage === number? s.current : s.img} onClick={() => paginado(number)}>{number}</p>
             </li>
            ))}
        </ul>
    </nav>

    )
    
}