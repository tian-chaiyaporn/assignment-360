import { SUBMIT_CALCULATOR_FORM } from '../actions/action';
import {
  filterDeals,
  formatResult,
  sortByPrice,
} from '../helpers/helpers'

const initialState = {
  deals: [
    {
      deal: 'Discount 15% for coupon code "LUCKY ONE" or the bill is more than 1000 Baht',
      discountPercent: 15,
      conditions: '_coupon === "LUCKY ONE" || _pay > 1000'
    },
    {
      deal: 'Come 4 pay 3 when they present coupon code as "4PAY3"',
      discountPercent: 25,
      conditions: '_coupon === "4PAY3" && _people >= 4'
    },
    {
      deal: 'Discount 20% for 2 customer when they present a coupon code as "LUCKY TWO"',
      discountPercent: 20,
      conditions: '_coupon === "LUCKY TWO" && _people >= 2'
    },
    {
      deal: 'Discount 25% when the bill is over 6000 Baht but it exclude all promotion',
      discountPercent: 25,
      conditions: '_pay > 6000' // these strings can be built by admin with the right UI
    }
  ],
  results: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CALCULATOR_FORM:
      const { people, coupons } = action;
      const totalBill = people * 459; // this can change if the bill is not fixed by the number of people
      return Object.assign({}, state, {
        // normally, this logic would be handled server-side with thunk or saga
        results: state.deals
          .filter(deal => filterDeals.call(null, deal, coupons, people, totalBill))
          .map(deal => formatResult.call(null, deal, totalBill))
          .sort(sortByPrice)
      })
    default :
      return state
  }
}

export default rootReducer;
