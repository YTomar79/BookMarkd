const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review: { type: String, required: true },
    bookIcon: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
