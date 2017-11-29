export const SUBMIT_CALCULATOR_FORM = 'SUBMIT_CALCULATOR_FORM';

export function submitCalculatorForm (people, coupons) {
  return {
    type: SUBMIT_CALCULATOR_FORM,
    people,
    coupons
  }
}
