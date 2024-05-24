const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];
let properties = [];

app.post('/api/register', (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;
    const user = { id: users.length + 1, firstName, lastName, email, phone, password };
    users.push(user);
    res.json({ message: 'Registration successful!' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

app.post('/api/properties', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { place, area, bedrooms, bathrooms, nearby } = req.body;
            const property = { id: properties.length + 1, place, area, bedrooms, bathrooms, nearby, userId: authData.id };
            properties.push(property);
            res.json({ message: 'Property posted successfully!' });
        }
    });
});

app.get('/api/properties', (req, res) => {
    res.json({ properties });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
