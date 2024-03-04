const redux = require("redux");

const createStore = redux.createStore; //deprecated in redux toolkit
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

//action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1, // to show we can have other props other than "type"
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

const initialState = {
  numOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, //make a copy of state and only update req property
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

//starts here. Creates the
const store = createStore(reducer);
console.log("Initial State", store.getState());

//listener
const unsubscribe = store.subscribe(() =>
  console.log("Updated State:", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake()); // for clarity of updation

// store.dispatch(restockCake(3));

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();

actions.restockCake(1);

unsubscribe(); // any dispatch after this ont update state as we are unsubscribed from the store
