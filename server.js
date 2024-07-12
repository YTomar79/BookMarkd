const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your-secret-key'; // Replace with a strong secret key

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/book-community', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the User model
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).send({ message: 'Error registering user', error });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: 86400 });
        res.status(200).send({ token });
    } catch (error) {
        res.status(400).send({ message: 'Error logging in', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
