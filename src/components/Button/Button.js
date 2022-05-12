import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({ children, onClick, ...allyProps }) => (
  <button type="button" className={s.Btn} onClick={onClick} {...allyProps}>
    {children}
  </button>
);

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
