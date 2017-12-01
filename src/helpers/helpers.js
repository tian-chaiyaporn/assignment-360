// this should cover most current and future deals
export function filterDeals(deal, coupons, totalPeople, totalBill) {
  const evalString = deal.conditions
    .replace('_people', totalPeople > 0 ? totalPeople : null)
    .replace('_pay', totalBill > 0 ? totalBill : null)

  return coupons.length > 0
    ? coupons.filter(coupon => {
      return eval(
        evalString.replace('_coupon', `"${coupon.replace(/["']/g, '')}"`)
      )}).length > 0
    : eval(evalString.replace('_coupon', null))
}

// for mapping
export function formatResult(deal, totalBill) {
  const discount = deal.discountPercent
  return {
    name: deal.deal ? deal.deal : 'please check database, or create new deal',
    finalBill: discount && discount > 0 && discount <= 1
      ? totalBill * (1 - discount)
      : totalBill
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
