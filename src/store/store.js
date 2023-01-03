import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";

// Importaciones de los reducers
import {
   uiReducer,
} from "../reducers";



// Main middlewares
const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);



// Main reducer
const reducers = combineReducers({
   // Lista de reducers
   ui: uiReducer,
});

export const store = createStore( 
   reducers,
   composedEnhancers
);