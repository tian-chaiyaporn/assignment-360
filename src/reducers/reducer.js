import { SUBMIT_CALCULATOR_FORM } from '../actions/action';

const initialState = {}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CALCULATOR_FORM:
      // normally, this logic would be handle server-side
      return state
    default :
      return state
  }
}

export default rootReducer;
