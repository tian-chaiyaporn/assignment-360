import React from 'react';
import { connect } from 'react-redux'
import shortid from 'shortid'

const Result = (props) => {
  const items = props.results.map(result => {
    return (
      <div key={shortid.generate()}>
        <p>{result.name}</p>
        <p>{`${result.finalBill} Baht`}</p>
      </div>
    )
  })
  return (
    <div className="Result">
      {items}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {results: state.results}
}

export const ResultTest = Result;

export default connect(mapStateToProps)(Result)
