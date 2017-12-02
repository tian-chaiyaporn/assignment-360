import React from 'react';
import './ResultItem.css';

const ResultItem = (props) => {
  return (
    <div className="result-item-container">
      {props.index === 0 && <p id="recommendation" className="recommend-tag">RECOMMENDED</p>}
      <div className={`ResultItem ${props.index === 0 && "recommendation"}`}>
        <p className="deal-name">{props.name}</p>
        <p className="final-amount">{`${props.amount} Baht`}</p>
      </div>
    </div>
  )
}

export default ResultItem
