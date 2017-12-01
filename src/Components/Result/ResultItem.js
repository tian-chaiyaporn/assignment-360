import React from 'react';

const ResultItem = (props) => {
  return (
    <div className="ResultItem">
      {props.index === 0 && <p id="recommendation">recommended</p>}
      <p>{props.name}</p>
      <p>{`${props.amount} Baht`}</p>
    </div>
  )
}

export default ResultItem
