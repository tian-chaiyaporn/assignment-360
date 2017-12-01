import {
  filterDeals,
  formatResult,
  sortByPrice
} from './helpers';

const deals =
[
  {
    deal: 'test1',
    discountPercent: 0.15,
    conditions: '_coupon === "LUCKY ONE" || _pay > 1000'
  },
  {
    deal: 'test2',
    discountPercent: 0.25,
    conditions: '_coupon === "4PAY3" && _people >= 4'
  },
  {
    deal: 'test3',
    discountPercent: 0.20,
    conditions: '_coupon === "LUCKY TWO" && _people >= 2'
  },
  {
    deal: 'test4',
    discountPercent: 0.25,
    conditions: '_pay > 6000' // these strings can be built by admin with the right UI
  }
]

describe('helper functions', () => {
  describe('filterDeals()', () => {

    function mapTests(testCase) {
      const { coupons, people } = testCase
      const totalBill = people * 459
      return deals // deals are defined below
        .filter(deal => filterDeals.call(null, deal, coupons, people, totalBill))
        .map(deal => deal.deal)
    }

    it('filters normal cases correctly', () => {
      const testCases = [
        { coupons: ['LUCKY ONE', 'LUCKY TWO'], people: 3 },
        { coupons: [], people: 14 },
        { coupons: ['4PAY3', 'LUCKY TWO'], people: 4 },
        { coupons: [], people: 3 },
        { coupons: [], people: 1 }
      ]

      const expectedResult = [
        ['test1', 'test3'],
        ['test1', 'test4'],
        ['test1', 'test2', 'test3'],
        ['test1'],
        []
      ]

      expect(testCases.map(mapTests)).toEqual(expectedResult)
    })

    it('handles unexpected cases', () => {
      const testCases = [
        { coupons: ['WRONG COUPON'], people: 3 },
        { coupons: [], people: 0 },
        { coupons: ['<script>console.log("attempted injection")</script>'], people: 4 }
      ]

      const expectedResult = [
        ['test1'],
        [],
        ['test1']
      ]

      expect(testCases.map(mapTests)).toEqual(expectedResult)
    })
  })

  describe('formatResult()', () => {
    const totalBill = 8000;

    it('formats result properly', () => {
      const testCases = deals;

      const expectedResult = [
        {name: 'test1', finalBill: totalBill * (1 - 0.15)},
        {name: 'test2', finalBill: totalBill * (1 - 0.25)},
        {name: 'test3', finalBill: totalBill * (1 - 0.20)},
        {name: 'test4', finalBill: totalBill * (1 - 0.25)},
      ]

      expect(testCases
        .map(deal => formatResult.call(null, deal, totalBill))
      ).toEqual(expectedResult)
    })

    it('handles unexpected cases', () => {
      const testCases = [
        {dealt: 'test0', discountPercent: 0.5}, // misspelt (data is keyed in by hand currently)
        {deal: 'test1', conditions: ''}, // missing argument
        {deal: 'test2', discountPercent: NaN}, // corrupted number
        {deal: 'test3', discountPercent: 2} // more than 100%
      ]

      const expectedResult = [
        {name: 'please check database, or create new deal', finalBill: totalBill / 2},
        {name: 'test1', finalBill: totalBill},
        {name: 'test2', finalBill: totalBill},
        {name: 'test3', finalBill: totalBill}
      ]

      const results = testCases.map(deal => formatResult.call(null, deal, totalBill))
      expect(results).toEqual(expectedResult);
    })
  })

  describe('sortByPrice()', () => {
    it('sorts properly', () => {
      const testCases = [
        {name: 'test1', finalBill: 800},
        {name: 'test2', finalBill: 511},
        {name: 'test3', finalBill: 300},
        {name: 'test4', finalBill: 4000},
      ]

      const expectedResult = [
        {name: 'test3', finalBill: 300},
        {name: 'test2', finalBill: 511},
        {name: 'test1', finalBill: 800},
        {name: 'test4', finalBill: 4000},
      ]

      expect(testCases.sort(sortByPrice)).toEqual(expectedResult)
    })

    it('handles unlikely cases', () => {
      const testCases = [
        {name: 'test1', finalBill: 100},
        {name: 'test2', finalBill: 100},
        {name: 'test3', finalBill: 0},
        {name: 'test4', finalBill: -50},
      ]

      const expectedResult = [
        {name: 'test4', finalBill: -50},
        {name: 'test3', finalBill: 0},
        {name: 'test1', finalBill: 100},
        {name: 'test2', finalBill: 100},
      ]

      expect(testCases.sort(sortByPrice)).toEqual(expectedResult)
    })
  })
})
