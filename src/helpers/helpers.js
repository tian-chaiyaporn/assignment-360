// this should cover most current and future deals
export function filterDeals(deal, coupons, totalPeople, totalBill) {
  const evalString = deal.conditions
    .replace('_people', totalPeople > 0 ? totalPeople : null)
    .replace('_pay', totalBill > 0 ? totalBill : null)

  return coupons.length > 0
    ? coupons.filter(coupon => eval(
        evalString
          .replace('_coupon', `"${coupon.replace(/["']/g, '')}"`)
        )
      ).length > 0
    : eval(evalString.replace('_coupon', null))
}

// for mapping
export function formatResult(deal, totalBill) {
  return {
    name: deal.deal,
    finalBill: totalBill * (1 - deal.discountPercent)
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
