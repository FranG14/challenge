
import {GET_PARKING_LOTS} from "../Action/parkingLots"

const initialState = {
    parkingLots: []
}

const parkigReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PARKING_LOTS:
            return {
                ...state,
                parkingLots: action.payload
            }
        default:
            return state
    }
}

export default parkigReducer