const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // response.data is the users
        const users = response.data.map((user) => user.id);
        dispatch(fetUserSuccess(users));
      })
      .catch((error) => {
        //error.message is the error
        dispatch(fetchUserFailed(error.message));
      });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        users: [],
        error: action.payload,
      };
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const subscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
