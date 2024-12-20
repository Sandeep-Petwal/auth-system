const bcrypt = require('bcrypt');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.js');
const validate = require("../util/validator.js");


const register = async (req, res) => {
    const { username, email, password } = req.body;
    const rules = {
        username: 'required|string',
        email: 'required|email',
        password: 'required|string|min:8'
    };

    let { status, message } = await validate(req.body, rules);
    if (!status) return res.render('register', { error: message })



    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        res.render('login', { success: 'Registration successful! Please log in.', error: ' ' });
    } catch (err) {
        console.log("\nError: ", err);
        res.render('register', { error: 'Error registering user.' });
    }
}


const validateRecaptcha = async (recaptchaResponse) => {
    if (!recaptchaResponse) {
        throw new Error('Please complete the reCAPTCHA verification.');
    }

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;
    const recaptchaVerification = await axios.post(verificationURL);
    if (!recaptchaVerification.data.success) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const recaptchaResponse = req.body['g-recaptcha-response'];

        // Validation
        const rules = {
            email: 'required|email',
            password: 'required|string'
        };

        let { status, message } = await validate(req.body, rules);
        if (!status) return res.render('login', { error: message })

        // Recaptcha
        await validateRecaptcha(recaptchaResponse);
        const userResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        // Authentication
        if (userResult.rows.length === 0) { return res.render('login', { error: 'Invalid email or password !.' }); }
        const user = userResult.rows[0];
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) { return res.render('login', { error: 'Invalid email or password !.' }); }

        // JWT
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '60m' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.redirect('/profile');
    } catch (error) {
        res.render('login', { error: 'An error occurred. Please try again later.' });
    }
}

const getProfile = async (req, res) => {
    const userId = req.user.id;
    const result = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [userId]);
    res.render('profile', { user: result.rows[0] });

}


const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;
        const result = await pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *', [username, email, userId]);
        res.redirect('/profile');
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).send('Error updating user profile');
    }
}




module.exports = { register, login, getProfile, updateProfile }