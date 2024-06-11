const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../pages')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));
app.use('/imgs', express.static(path.join(__dirname, '../imgs')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));

// connexion with mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login',
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

/*
//create users table
    db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    mobile INT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`, (err, results) => {
  if (err) throw err;
  console.log('Users table created or already exists.');
});

*/


//register endpoint
app.post('/register', async (req, res) => {
    const { firstName, lastName, country, mobile,username, email,password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (firstName, lastName, country, mobile,username, email,password) VALUES (?, ?, ? , ?, ?, ?, ?)',
            [firstName, lastName, country, mobile,username, email, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error registering user');
                }
                res.status(201).send('User registered successfully');
            }
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error logging in');
            }
            if (results.length === 0) {
                return res.status(400).send('Invalid username or password');
            }
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Invalid username or password');
            }
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        }
    );
});


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/signin.html'));
});


app.listen(3000);
