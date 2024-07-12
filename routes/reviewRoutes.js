const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

router.get('/', async (req, res) => {
    const reviews = await Review.find().populate('user', 'username');
    res.json(reviews);
});

router.post('/', async (req, res) => {
    const { user, review, bookIcon } = req.body;
    const newReview = new Review({ user, review, bookIcon });
    await newReview.save();
    res.status(201).json(newReview);
});

module.exports = router;
