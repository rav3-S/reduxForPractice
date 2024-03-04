const CAKE_ORDERED = "CAKER_ORDERED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
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
    default:
      return state;
  }
};
