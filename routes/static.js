const express = require('express');
const staticRoutes = express.Router();
const pool = require('../config/db.js');
const { authenticateJWT, isAuthenticated } = require('../middleware/authentication.js');
const limiter = require("../util/rateLimit.js")




// Testing
staticRoutes.get('/', (req, res) => {
    console.log("Working")
    res.json({ status: "Working", login: "/login", register: "/register", profile: "/profile" });
});

// Auth Routes with rate limit
staticRoutes.get('/register', limiter, isAuthenticated, (req, res) => {
    res.render('register', { error: null });
});
staticRoutes.get('/login', limiter, isAuthenticated, (req, res) => {
    res.render('login', { error: "", siteKey: process.env.RECAPTCHA_SITE_KEY });
});

staticRoutes.get('/profile', authenticateJWT, async (req, res) => {
    const id = req.user.id;
    const result = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [id]);
    res.render('profile', { user: result.rows[0] });
});



module.exports = staticRoutes