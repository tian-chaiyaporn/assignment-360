import React from 'react';
import { shallow } from 'enzyme';
import { ResultTest } from './Result';

it('renders without crashing', () => {
  const results = [
    {name: 'test4', finalBill: -50},
    {name: 'test3', finalBill: 0},
    {name: 'test1', finalBill: 100},
    {name: 'test2', finalBill: 100},
  ]
  shallow(<ResultTest results={results} />);
});
