import React from 'react';

const ResultItem = (props) => {
  return (
    <div className="ResultItem">
      <p>{props.index === 0 && 'recommended'}</p>
      <p>{props.name}</p>
      <p>{`${props.amount} Baht`}</p>
    </div>
  )
}

export default ResultItem
