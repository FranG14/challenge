  import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import parkigReducer from "../Reducer/parkingLots";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  parkigReducer,
  composeEnhancers(
    
    applyMiddleware(thunk, logger)
  )
);

export default store;