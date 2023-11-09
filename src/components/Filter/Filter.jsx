import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

const Filter = ({ onFilterChange }) => {
  return (
    <div className={css.filter}>
      <h2>Find contacts by name</h2>
      <input
        type="text"
        name="filter"
        onChange={onFilterChange}
        className={css.filter__input}
      ></input>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
