import { SUBMIT_CALCULATOR_FORM } from '../actions/action';

const initialState = {
  deals: [
    {
      deal: 'Discount 15% for coupon code "LUCKY ONE" or the bill is more than 1000 Baht',
      discountPercent: 15,
      conditions: {
        type: 'OR',
        coupon: 'LUCKY ONE',
        pay: '>1000'
      }
    },
    {
      deal: 'Come 4 pay 3 when they present coupon code as "4PAY3"',
      discountPercent: 25,
      conditions: {
        type: 'AND',
        coupon: '4PAY3',
        people: '===4'
      }
    },
    {
      deal: 'Discount 20% for 2 customer when they present a coupon code as "LUCKY TWO"',
      discountPercent: 20,
      conditions: {
        type: 'AND',
        coupon: 'LUCKY TWO',
        people: '===2'
      }
    },
    {
      deal: 'Discount 25% when the bill is over 6000 Baht but it exclude all promotion',
      discountPercent: 25,
      conditions: {
        type: 'AND',
        pay: '>6000'
      }
    }
  ]
}

// this should cover most current and future deals
function filterDeals(deal, coupons, totalPeople, totalBill) {
  const conditions = deal.conditions;
  const couponOk   = conditions.coupon ? coupons.includes(conditions.coupon)        : null;
  const moneyOk    = conditions.pay    ? eval(`${totalBill}${conditions.pay}`)      : null;
  const peopleOk   = conditions.people ? eval(`${totalPeople}${conditions.people}`) : null;

  if (conditions.type === 'OR') {
    return couponOk === true || moneyOk === true || peopleOk === true
  }
  else if (conditions.type === 'AND') {
    return (couponOk === true || couponOk === null)
      &&   (moneyOk  === true || moneyOk  === null)
      &&   (peopleOk === true || peopleOk === null)
  }
}

// for mapping
function formatResult(deal) {
  
}

// for sorting
function sortByPrice() {}

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
