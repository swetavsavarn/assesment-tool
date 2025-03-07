import React from 'react';
import PropTypes from 'prop-types';

const StarRatings = ({ rating, setRating, readonly = false, className = "" }) => {
    return (
        <div className="">
            {/* Render 5 stars */}
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => !readonly && setRating(star)} // Update rating only if not readonly
                    disabled={false} // Disable the button if readonly is true
                    className={`text-3xl ${star <= rating ? 'text-[#FFB800]' : 'text-gray-300'} ${!readonly ? "hover:text-yellow-500" : ""} disabled:opacity-50  cursor-default ${className}`}
                >
                    ★
                </button>
            ))
            }
        </div >
    );
};

StarRatings.propTypes = {
    rating: PropTypes.number.isRequired,   // Rating passed as prop (controlled by the parent component)
    setRating: PropTypes.func.isRequired,  // Function to update rating (passed by the parent component)
    readonly: PropTypes.bool,              // Option to make the stars readonly
};

StarRatings.defaultProps = {
    readonly: false,  // Default is false, meaning the stars are interactive
};

export default StarRatings;
