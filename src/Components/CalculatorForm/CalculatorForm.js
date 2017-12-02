import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/action'
import shortid from 'shortid'
import './CalculatorForm.css';

class CalculatorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: 1,
      couponInput: '',
      coupons: []
    };
    this.handlePeopleChange = this.handlePeopleChange.bind(this)
    this.handleCouponChange = this.handleCouponChange.bind(this)
    this.addCoupon = this.addCoupon.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePeopleChange(e) { this.setState({people: e.target.value}) }

  handleCouponChange(e) { this.setState({couponInput: e.target.value}) }

  addCoupon(e) {
    e.preventDefault();
    this.setState((prevState) => {
      const newCoupon = prevState.couponInput.toUpperCase().trim().replace(/\s\s+/g, ' ')
      return (
        !prevState.coupons.includes(newCoupon) && {
          couponInput: '',
          coupons: [...prevState.coupons, newCoupon]
        }
      )
    })
  }

  deleteCoupon(coupon) {
    // no need for id here, as coupon body cannot be identical.
    this.setState(prevState => {
      return {coupons: prevState.coupons.filter(c => c !== coupon)}
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitCalculatorForm(this.state.people, this.state.coupons)
    this.setState({people: 1, coupons: []})
  }

  render() {
    const appliedCoupons = this.state.coupons.map(coupon => {
      return (
        <p key={shortid.generate()} className="calculator-item coupon">
          <span id={coupon} className="coupon-item">{coupon}</span>
          <button
            className="coupon-delete-button"
            onClick={this.deleteCoupon.bind(this, coupon)}
          >
            -
          </button>
        </p>
      )
    })

    return (
      <div className="CalculatorForm">
        <form className="calculator-form">
          <h1 className="calculator-title">Calculator Form</h1>
          <fieldset className="calculator-fieldset">
            <legend className="calculator-legend">Bill Calculator</legend>

            <p className="calculator-people">
              <label htmlFor="people" className="calculator-item people-label">
                <span>NUMBER OF PEOPLE: </span>
              </label>
              <input
                type="number"
                name="people"
                className="calculator-item people-input"
                id="people-input"
                onChange={this.handlePeopleChange}
                value={this.state.people}
                required
                min="1"
                max="60"
              />
            </p>

            <section className="calculator-coupon">
              {appliedCoupons}
              <p className="calculator-coupon-add">
                <label htmlFor="coupon" className="calculator-item coupon-label">
                  <span>COUPON: </span>
                </label>
                <input
                  type="text"
                  className="calculator-item coupon-input"
                  id="coupon-input"
                  name="coupon"
                  onChange={this.handleCouponChange}
                  value={this.state.couponInput}
                  placeholder="TYPE HERE"
                  minLength="1"
                  maxLength="100"
                />
                <button
                  className="coupon-add-button"
                  id="coupon-add"
                  onClick={this.addCoupon}
                >
                  +
                </button>
              </p>
            </section>

            <p>
              <button
                className="coupon-submit-button"
                id="submit"
                type="submit"
                onClick={this.handleSubmit}
              >
                CALCULATE BILL
              </button>
            </p>

          </fieldset>
        </form>
      </div>
    );
  }
}

export const CalculatorFormTest = CalculatorForm

export default connect(null, actions)(CalculatorForm);
