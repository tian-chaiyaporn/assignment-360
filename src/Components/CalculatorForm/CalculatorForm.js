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
        <p key={shortid.generate()} className="coupon">
          <span>{coupon}</span>
          <button onClick={this.deleteCoupon.bind(this, coupon)}>Delete</button>
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
                <span>Number of People: </span>
                <strong>*</strong>
              </label>
              <input
                type="number"
                name="people"
                id="people-input"
                onChange={this.handlePeopleChange}
                value={this.state.people}
                required
                min="1"
                max="60"
              />
            </p>
            <section className="coupon-section">
              {appliedCoupons}
              <p className="coupon-form">
                <label htmlFor="coupon">
                  <span>Coupon: </span>
                </label>
                <input
                  type="text"
                  id="coupon-input"
                  name="coupon"
                  onChange={this.handleCouponChange}
                  value={this.state.couponInput}
                  minLength="1"
                  maxLength="100"
                />
                <button onClick={this.addCoupon}>Add</button>
              </p>
            </section>
            <p>
              <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

export const CalculatorFormTest = CalculatorForm

export default connect(null, actions)(CalculatorForm);
