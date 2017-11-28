import React from 'react';
import { shallow } from 'enzyme';
import CalculatorForm from './CalculatorForm';

it('renders without crashing', () => {
  shallow(<CalculatorForm />);
});
