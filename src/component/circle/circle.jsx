import React, { Component } from 'react';

import './circle.css';

class Circle extends Component {
  render() {
    const { count, label, strokeDashoffset } = this.props;
    return (
      <div class="circle">
        <div className="circle__count">{count}</div>
        <div className="circle__label">{label}</div>
        <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle
              id="circle"
              class="circle__animation"
              r="70"
              cy="75"
              cx="75"
              stroke-width="7"
              stroke="indigo"
              stroke-dasharray="440"
              stroke-dashoffset={this.props.strokeDashoffset}
              fill="none"
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default Circle;
