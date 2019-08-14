/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'
import ReactPropTypes from 'prop-types';

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
      <div>
        <button onClick={onIncrementAsync}>
          Increment after 1 second
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
      </div>

Counter.propTypes = {
  value: ReactPropTypes.number.isRequired,
  onIncrement: ReactPropTypes.func.isRequired,
  onDecrement: ReactPropTypes.func.isRequired
}

export default Counter
