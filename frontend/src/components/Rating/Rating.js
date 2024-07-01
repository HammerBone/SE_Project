// src/Rating.js
import React from 'react';
import PropTypes from 'prop-types';
import './Rating.css';

const Rating = ({ rating }) => {
  // Determine the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="rating">
      {Array(fullStars).fill().map((_, index) => (
        <span key={index} className="star full"></span>
      ))}
      <div className='half2'><div className='half'>{halfStars === 1 && <span className="star half" ></span>}</div></div>
      {Array(emptyStars).fill().map((_, index) => (
        <span key={index} className="star empty"></span>
      ))}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;