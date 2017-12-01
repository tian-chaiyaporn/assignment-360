import { SUBMIT_CALCULATOR_FORM } from '../actions/action';

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
  ]
}

// this should cover most current and future deals
function filterDeals(deal, coupons, totalPeople, totalBill) {
  const evalString = deal.conditions
    .replace('_people', totalPeople)
    .replace('_pay', totalBill)

  return coupons.length > 0
    ? coupons.filter(coupon => eval(evalString.replace('_coupon', coupon))) > 0
    : eval(evalString)
}

// for mapping
function formatResult(deal, totalBill) {
  return {
    name: deal.deal,
    finalBill: totalBill * (1 - discountPercent)
  }
}

// for sorting
function sortByPrice(dealA, dealB) {
  switch (true) {
    case dealA.finalBill > dealB.finalBill:
      return 1;
    case dealA.finalBill < dealB.finalBill:
      return -1;
    case dealA.finalBill === dealB.finalBill:
      return 0;
  }
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CALCULATOR_FORM:
      // normally, this logic would be handled server-side with thunk or saga
      // I put it here because it's easier to access the store
      return state
    default :
      return state
  }
}

export default rootReducer;
