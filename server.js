// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname))); // This serves everything in the root folder

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'amullya@2003', // Your MySQL password
    database: 'clientdb',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL...');
});

// Serve index.html when user accesses the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission to insert data into the 'clients' table
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation for empty fields
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Insert into MySQL database
    const query = 'INSERT INTO clients (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err) => {
        if (err) {
            console.error('Failed to insert data:', err);
            return res.status(500).send('Database insertion failed.');
        }

        // Send email notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'patilamullya@gmail.com', // Your email
                pass: 'lnpx zhvr kzdb tqgl', // Your App Password
            },
        });

        const mailOptions = {
            from: 'patilamullya@gmail.com', // Sender address
            to: 'patilamullya@gmail.com',   // Recipient address
            subject: 'New Form Submission',  // Subject line
            text: `You have received a new message from:\n` +
                  `User Name: ${name}\n` +
                  `Email ID: ${email}\n` +
                  `Message: ${message}`, // Plain text body     
                    };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error sending email:', error);
            }
            console.log('Email sent: ' + info.response);
        });

        // Redirect back to homepage after submission
        res.redirect('/');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
