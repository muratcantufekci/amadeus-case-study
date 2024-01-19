export const getAirports = async () => {
    return fetch(`https://amadeus-case-study-default-rtdb.firebaseio.com/airports.json`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    }).then(response => response.json()).catch(err => console.log(err))
}

export const getFlights = async () => {
    return fetch(`https://amadeus-case-study-default-rtdb.firebaseio.com/flights.json`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    }).then(response => response.json()).catch(err => console.log(err))
}