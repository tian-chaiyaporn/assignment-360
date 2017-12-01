import React from 'react';
import { connect } from 'react-redux'
import shortid from 'shortid'
import ResultItem from './ResultItem'

const Result = (props) => {
  const items = props.results.map((result, index) => {
    return (
      <ResultItem
        key={shortid.generate()}
        index={index}
        name={result.name}
        amount={result.finalBill}
      />
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
