import React from 'react';
import './Box.css';

const Box = (props) => (
  <li className="box"
      style={{backgroundColor: props.opened ? props.color : '#888'}}
      onClick={() => props.colorCheck(props.color, props.id)}></li>
);

export default Box;
