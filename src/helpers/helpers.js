// this should cover most current and future deals
export function filterDeals(deal, coupons, totalPeople, totalBill) {
  const evalString = deal.conditions
    .replace('_people', totalPeople)
    .replace('_pay', totalBill)

  return coupons.length > 0
    ? coupons.filter(coupon => eval(evalString.replace('_coupon', coupon))) > 0
    : eval(evalString)
}

// for mapping
export function formatResult(deal, totalBill) {
  return {
    name: deal.deal,
    finalBill: totalBill * (1 - discountPercent)
  }
}

// for sorting
export function sortByPrice(dealA, dealB) {
  switch (true) {
    case dealA.finalBill > dealB.finalBill:
      return 1;
    case dealA.finalBill < dealB.finalBill:
      return -1;
    case dealA.finalBill === dealB.finalBill:
      return 0;
  }
}
