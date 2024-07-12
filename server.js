const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
// Serve static files from the public directory
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'reviews_db'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected...');
});

// Endpoint to fetch reviews
app.get('/reviews', (req, res) => {
    const sql = `
        SELECT reviews.id, users.username, books.title, reviews.review 
        FROM reviews 
        JOIN users ON reviews.user_id = users.id 
        JOIN books ON reviews.book_id = books.id 
        ORDER BY reviews.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            res.status(500).json({ error: 'Failed to fetch reviews' });
            return;
        }
        res.json(results);
    });
});

// Endpoint to add a review
app.post('/reviews', (req, res) => {
    const { user_id, book_id, review } = req.body;
    const sql = 'INSERT INTO reviews (user_id, book_id, review) VALUES (?, ?, ?)';
    db.query(sql, [user_id, book_id, review], (err, result) => {
        if (err) {
            console.error('Error adding review:', err);
            res.status(500).json({ error: 'Failed to add review' });
            return;
        }
        res.json({ id: result.insertId, user_id, book_id, review });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
