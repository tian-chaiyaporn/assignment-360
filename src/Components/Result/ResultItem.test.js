import React from 'react';
import { shallow } from 'enzyme';
import ResultItem from './ResultItem';

describe('ResultItem', () => {
  const name = 'test1';
  const finalBill = 8000;
  const wrapper = shallow(<ResultItem index={0} name={name} amount={finalBill}/>);

  it('renders without crashing', () => { wrapper });

  it('renders recommendation if index = 0', () => {
    expect(wrapper.find('#recommendation')).toHaveLength(1)
  });

  it('does not render recommendation if index !== 0', () => {
    const wrapperTwo = shallow(<ResultItem index={3} name={name} amount={finalBill}/>);
    expect(wrapperTwo.find('#recommendation')).toHaveLength(0)
  });
})
