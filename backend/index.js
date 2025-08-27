// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

// Middleware (optional, e.g., for JSON parsing)
app.use(express.json());

// Connect to MongoDB Atlas
// NOTE: The password contains a special character (#) which must be URL-encoded as %23
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Register route
app.post('/register', async (req, res) => {
    const { name, password } = req.body;
    console.log('Register endpoint hit:', { name, password }); // Log incoming data
    if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, password: hashedPassword });
        await user.save();
        console.log('User saved to MongoDB:', { name }); // Log successful save
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error saving user:', err); // Log error
        res.status(500).json({ message: 'Error registering user', error: err.message, stack: err.stack });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'Name does not exist.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }
        res.status(200).json({ message: 'Login successful.' });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, '../')));

// Send login.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../loginPage.html'));
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
