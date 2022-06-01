import axios from "axios";

export function getDogs() {
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        });
    }
}

export function getTemperaments(){
    return async function (dispatch){
        var temp = await axios.get("http://localhost:3001/temperaments");
        return dispatch ({
            type: "GET_TEMPERAMENTS", 
            payload: temp.data
        });
    }
}

export function getDetail (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch ({
                type: "GET_DETAILS",
                payload: json.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }
}

export function searchDogs(search) {
    return async function (dispatch) {
    await axios.get("http://localhost:3001/dogs?name=" + search)
    .then((dogs => {
        dispatch({
            type: "SEARCH_DOGS",
            payload: dogs.data
        })
    }))
    
    .catch((error) => {
        console.log(error)
    })
    }
}

export function postDog (payload) {
    return async function(dispatch) {
        const response = await axios.post("http://localhost:3001/dog", payload);
        console.log(response)
        return response;
    }
}
//-------------------------ORDERS----------------------------
export function orderByName(payload){
   
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
   
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}
//------------------------FILTERS----------------------------
export function filterCreated(payload){ 
    return {    
        type: "FILTER_CREATED",
        payload
    }
}

export function filterTemperament(payload){
    return {
        type: "FILTER_TEMPERAMENT",
        payload
    }
}