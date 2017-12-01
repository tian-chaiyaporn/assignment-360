import {
  filterDeals,
  formatResult,
  sortByPrice
} from './helpers';

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
    it('formats result properly', () => {

    })

    it('handles corrupted data properly', () => {

    })
  })

  describe('sortByPrice()', () => {
    it('sorts properly', () => {

    })

    it('handles unintended inputs properly', () => {

    })
  })
})

const deals =
[
  {
    deal: 'test1',
    discountPercent: 15,
    conditions: '_coupon === "LUCKY ONE" || _pay > 1000'
  },
  {
    deal: 'test2',
    discountPercent: 25,
    conditions: '_coupon === "4PAY3" && _people >= 4'
  },
  {
    deal: 'test3',
    discountPercent: 20,
    conditions: '_coupon === "LUCKY TWO" && _people >= 2'
  },
  {
    deal: 'test4',
    discountPercent: 25,
    conditions: '_pay > 6000' // these strings can be built by admin with the right UI
  }
]
