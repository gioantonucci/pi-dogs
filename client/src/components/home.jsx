import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  orderByName,
  filterCreated,
  orderByWeight,
  getTemperaments,
  filterTemperament,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./card";
import s from "../styles/Home.module.css";
import Paginated from "./paginated";

export default function Home() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  //-PAGINADO----------------------------------------
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  //-------Recargar--------------------------------------
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  //-ORDENAMIENTOS----------------------------------------
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  //-Por peso--------------------------------------------
  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  //-FILTRADOS-------------------------------------------
  //-Por creacion----------------------------------------
  function handleFilterCreated(e) {
    e.preventDefault(e);
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  //-Por temperamento------------------------------------
  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterTemperament(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={s.conteiner}>
      <div className={s.bloque}>
        <h1>El paraiso de los perris</h1>
      </div>

      <div>
        <div className={s.row}>
          <select className={s.select} onChange={(e) => handleSort(e)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select className={s.select} onChange={(e) => handleSortWeight(e)}>
            <option value="weightasc"> Más pesado </option>
            <option value="weightdesc"> Menos pesado </option>
          </select>
          <select
            className={s.select}
            onChange={(e) => handleFilterByTemperament(e)}
          >
            <option value="" disabled selected>
              Filtrar por temperamento:
            </option>
            <option value="all">Todos</option>
            {allTemperaments?.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <select className={s.select} onChange={(e) => handleFilterCreated(e)}>
            <option value="all">Todos</option>
            <option value="api">Raza existente</option>
            <option value="created">Raza creada</option>
          </select>
        </div>
        <button className={s.btn} onClick={(e) => handleClick(e)}>
          Volver a cargar todos los perris
        </button>
      </div>
      <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
      <div className={s.card}>
        <ul className={s.grid}>
          {" "}
          {currentDogs?.map((d) => {
            return (
              <div>
                <Link to={`/home/${d.id}`}>
                  <Card
                    className={s.card}
                    name={d.name}
                    img={
                      d.image
                        ? d.image
                        : "https://pm1.narvii.com/6893/724dede9a107e0d420269799b4efe8be26a88df9r1-842-1024v2_00.jpg"
                    }
                    temperament={d.temperament}
                  />
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );

  /*
Ruta principal: debe contener
- [ ] Input de búsqueda para encontrar razas de perros por nombre
- [ ] Área donde se verá el listado de razas de perros.
 Deberá mostrar su:
  - Imagen
  - Nombre
  - Temperamento
  - Peso
- [*] Botones/Opciones para filtrar por:
    - Temperamento 
    - Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
- [*] Botones/Opciones para ordenar tanto
 ascendentemente como descendentemente las razas de perro por:
    - Orden alfabético 
    - Peso
- [ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.
*/
}
