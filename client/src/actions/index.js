import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var temp = await axios.get("/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temp.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getClean() {
  return {
    type: "GET_CLEAN",
    payload: [],
  };
}

export function searchDogs(search) {
  return async function (dispatch) {
    try {
      let dogs = await axios.get("/dogs?name=" + search);
      return dispatch({
        type: "SEARCH_DOGS",
        payload: dogs.data,
      });
    } catch {
      alert("We dont have that dog!");
    }
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("/dog", payload);
    //console.log("soy", response.temperament[1])
    return response;
  };
}
//-------------------------ORDERS----------------------------
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}
//------------------------FILTERS----------------------------
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterTemperament(payload) {
  return {
    type: "FILTER_TEMPERAMENT",
    payload,
  };
}
