import React, { Component } from 'react';
import './CalculatorForm.css';

class CalculatorForm extends Component {
  constructor() {
    super();
    this.state = {
      coupons: []
    };
  }

  render() {
    const appliedCoupons = this.state.coupons.map(coupon => {
      return (
        <p className="coupon">
          <span>{coupon}</span>
        </p>
      )
    })

    return (
      <div className="CalculatorForm">
        <form>
          <h1>Calculator Form</h1>
          <fieldset>
            <legend>Bill Calculator</legend>
            <p>
              <label htmlFor="people">
                <span>Number of People</span>
                <strong>*</strong>
              </label>
              <input type="text" name="people" id="size_1"/>
            </p>
            <section>
              {appliedCoupons}
              <p>
                <label htmlFor="coupon">
                  <span>Coupon: </span>
                </label>
                <input type="text" id="coupon-input" name="coupon"/>
                <button>Add</button>
              </p>
            </section>
            <p>
              <button type="submit">Submit</button>
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CalculatorForm;
