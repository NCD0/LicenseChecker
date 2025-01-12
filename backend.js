const express = require('express');
const cors = require('cors');
const { createPool } = require('mysql2');

/*
npm install express cors mysql2
*/

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

const database = createPool({
    host: "localhost",
    user: "root",
    password: "passsword", // your password
    database: "license", // change this to match your database name (in the database.sql file it's the same)
    connectionLimit: 10,
    authPlugins: {
        mysql_native_password: () => () => 'passsword' // same password as above
    }
}); // change these values to match your database configuration

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error');
});

// post request to check for a license key
app.post('/license', (req, res) => {
    const license_key = req.body.license_key;
    console.log('Received license key:', license_key);

    database.query('SELECT * FROM licenses WHERE license_key = ?', [license_key], (err, results) => {
        if (err) {
            console.error('Database error:', err); 
            return res.status(500).json({ error: err.message });
        }
        console.log('Query results:', results); 
        res.json(results); 
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});