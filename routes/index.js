const express = require('express');
const router = express.Router();
const { register, login , updateProfile} = require("../controller/index.js")
const staticRoutes = require('../routes/static.js');
const {authenticateJWT} = require('../middleware/authentication.js');


router.use('/', staticRoutes);
router.post('/register', register);
router.post('/login', login);
router.post('/update', authenticateJWT, updateProfile);
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});


module.exports = router;