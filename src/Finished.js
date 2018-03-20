import React from 'react';
import './Finished.css';

const Finished = (props) => (
  <div className="finished">
    <h3 className="finished-title">Congratulations!</h3>
    <div className="retry" onClick={props.reset}>Retry</div>
  </div>
);

export default Finished;
