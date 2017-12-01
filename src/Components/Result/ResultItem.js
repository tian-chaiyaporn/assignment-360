import React from 'react';

const ResultItem = (props) => {
  return (
    <div className={`"ResultItem" ${props.index === 0 && "recommendation"}`}>
      {props.index === 0 && <p id="recommendation">recommended</p>}
      <p className="deal-name">{props.name}</p>
      <p className="final-amount">{`${props.amount} Baht`}</p>
    </div>
  )
}

export default ResultItem
