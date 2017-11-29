import React from 'react';
import { shallow, mount } from 'enzyme';
import { CalculatorFormTest } from './CalculatorForm';

describe('component renders correctly', () => {
  const wrapper = shallow(<CalculatorFormTest />);

  it('renders without crashing', () => { wrapper });

  it('renders number correctly', () => {
    wrapper.find('#people-input').simulate('change', {target: {value: 3}});
    expect(wrapper.find('#people-input').props().value).toBe(3)
  })

  it('renders coupon input correctly', () => {
    wrapper.find('#coupon-input').simulate('change', {target: {value: 'testing'}});
    expect(wrapper.find('#coupon-input').props().value).toBe('testing')
  })

  it('renders added coupons correctly', () => {
    const testValue = 'testing'
    wrapper.find('#coupon-input').simulate('change', {target: {value: testValue}})
    wrapper.find('#coupon-add').simulate('click', {preventDefault: () => {}})
    expect(wrapper.find(`#${testValue.toUpperCase()}`).props().children).toBe(testValue.toUpperCase())
  })

  it('renders deleted coupons correctly', () => {
    const testValue = 'testing'
    wrapper.find('#coupon-input').simulate('change', {target: {value: testValue}})
    wrapper.find('#coupon-add').simulate('click', {preventDefault: () => {}})
    wrapper.find(`#${testValue.toUpperCase()} + button`).simulate('click', {preventDefault: () => {}})
    expect(wrapper.find(`#${testValue.toUpperCase()}`).length).toBe(0)
  })
})
