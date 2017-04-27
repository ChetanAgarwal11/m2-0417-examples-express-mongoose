const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ReviewSchema = new Schema(
    productID: Schema.type.ObjectID,
    description: String,
    stars: Number
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
