import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import DevTools from "./containers/DevTools";
import { carReducer } from "./reducers/carReducer";
import { alertReducer } from "./reducers/alertReducer";
import { userReducer } from "./reducers/userReducer";
import { bookingReducer } from "./reducers/bookingReducer";

const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers({
  carReducer,
  alertReducer,
  userReducer,
  bookingReducer,
});

const enhancer = compose(applyMiddleware(...middleware), DevTools.instrument());

const store = createStore(rootReducer, initialState, enhancer);

export default store;
