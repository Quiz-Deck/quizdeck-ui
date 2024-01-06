import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/authReducer";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  noReducer: (state = {}) => state,
});

// Create a name for the reducer in local storage
const reducerName = process.env.REACT_APP_SLUG + "_reducer";

// Load the reducer state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem(reducerName);
    return serializedState === null ? {} : JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

// Save the reducer state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    return localStorage.setItem(reducerName, serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState();
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);
store.subscribe(() => saveState(store.getState()));

export default store;
