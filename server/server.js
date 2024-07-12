const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'book_community'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

// Endpoint to submit a review
app.post('/submit-review', (req, res) => {
    const { userId, bookId, review } = req.body;
    
    // Insert the review
    const reviewQuery = 'INSERT INTO reviews (user_id, book_id, review) VALUES (?, ?, ?)';
    db.query(reviewQuery, [userId, bookId, review], (err, result) => {
        if (err) throw err;
        
        // Update user points
        const pointsQuery = 'UPDATE users SET points = points + 5 WHERE id = ?';
        db.query(pointsQuery, [userId], (err, result) => {
            if (err) throw err;
            res.send({ message: 'Review submitted and points updated!' });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Endpoint to get all reviews
app.get('/get-reviews', (req, res) => {
    const reviewsQuery = 'SELECT * FROM reviews ORDER BY id DESC';
    db.query(reviewsQuery, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

