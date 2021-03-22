import { createStore, combineReducers, applyMiddleware } from "redux";
// import {} from "react-"
import thunk from "redux-thunk";
import ProductReducer from "../Reducers/productReducer";

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
  products: ProductReducer,
});

export default createStore(rootReducer, middleware);
