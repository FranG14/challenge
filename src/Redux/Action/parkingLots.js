import axios from "axios"
const { access_token } = process.env
export const GET_PARKING_LOTS = "GET_PARKING_LOTS";

const API_KEY = "mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx"
const ENDPOINT = "https://api.yelp.com/v3/businesses/search?term=parking&location=SanFrancisco&limit=20&offset=14&sort_by=rating"


export const getParkingLots = (location) => {
    return function (dispatch) {
        return axios.get(`/cors-proxy/https://api.yelp.com/v3/businesses/search?term=parking&location=${location}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                Origin: 'localhost',
                withCredentials: true
            }
        })
            .then(response => {
                console.log(response.data)
                dispatch({ type: "GET_PARKING_LOTS", payload: response.data })
            })
        }
}

// export function searchCountry(id) {
//     return function (dispatch) {
//         return axios.get("http://localhost:3001/countries/"+id)
//             .then(response => {
//                 console.log(response.data)
//                 dispatch({ type: "SEARCH_COUNTRY", payload: response.data })
//             })
//         }
// }