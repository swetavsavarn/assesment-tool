import React from 'react';

const StatsCards = ({ averageRating = 0, totalReviews = 0 }) => {
    return (
        <div className="flex flex-wrap justify-center gap-6 pb-5">
            {/* Average Rating Card */}
            <div className="bg-primary-200 rounded-lg shadow-lg p-3 w-72">
                <h2 className="text-blue-400 text-2xl font-bold text-center">Average Rating</h2>
                <p className="text-gray-200 text-5xl font-bold text-center mt-4">
                    {averageRating}
                </p>
                <p className="text-white text-center mt-2">Out of 5 Stars</p>
            </div>

            {/* Total Reviews Card */}
            <div className="bg-primary-200 rounded-lg shadow-lg p-3 w-72">
                <h2 className="text-blue-400 text-2xl font-bold text-center">Total Reviews</h2>
                <p className="text-gray-200 text-5xl font-bold text-center mt-4">
                    {totalReviews}
                </p>
                <p className="text-white text-center mt-2">Reviews Submitted</p>
            </div>
        </div>
    );
};

export default StatsCards;
