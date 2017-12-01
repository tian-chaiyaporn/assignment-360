import React from 'react';
import { shallow, mount } from 'enzyme';
import { ResultTest } from './Result';

describe('Result renders correctly', () => {
  it('renders without crashing', () => {
    const results = [
      {name: 'test4', finalBill: -50},
      {name: 'test3', finalBill: 0},
      {name: 'test1', finalBill: 100},
      {name: 'test2', finalBill: 100},
    ]
    shallow(<ResultTest results={results} />);
  });

  it('renders recommendation correctly', () => {
    const testCases = [
      {name: 'test3', finalBill: 300},
      {name: 'test2', finalBill: 511},
      {name: 'test1', finalBill: 800},
      {name: 'test4', finalBill: 4000},
    ]

    const wrapper = mount(<ResultTest results={testCases} />)

    // get each finalBill value from each result item
    const allFinalBills = wrapper
      .find('ResultItem')
      .children()
      .find('.final-amount')
      .map(bill => {
        return bill.props().children.replace(' Baht', '')
      })

    // get finalBill value from result item flagged as recommendation
    const lowestBill = wrapper.find('.recommendation')
      .children()
      .find('.final-amount')
      .props()
      .children
      .replace(' Baht', '')

    allFinalBills.forEach(bill => {
      expect(parseInt(lowestBill)).toBeLessThanOrEqual(parseInt(bill))
    })
  });
})
