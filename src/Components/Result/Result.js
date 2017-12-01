import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/action'

class Result extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      this.props.results[0] && this.props.results[0].name
        ? this.props.results[0].name + this.props.results[0].finalBill
        : 'empty'
    )
  }
}

const mapStateToProps = (state) => {
  return {results: state.results}
}

export const ResultTest = Result;

export default connect(mapStateToProps, actions)(Result)
