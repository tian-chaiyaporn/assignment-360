import React from 'react';
import { shallow } from 'enzyme';
import { CalculatorFormTest } from './CalculatorForm';


describe('component renders correctly', () => {
  it('renders without crashing', () => {
    shallow(<CalculatorFormTest />);
  });

  // it('renders textinput and number correctly', () => {
  //   const wrapper = shallow(<CalculatorFormTest />);
  //   wrapper.find('people-input').simulate('change', {target: {value: 3}});
  //   expect(wrapper.find('people-input').value)
  // })
})
