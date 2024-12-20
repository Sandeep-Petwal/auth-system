const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.redirect('/login?error=Token expired or invalid');
            }
            req.user = user;
            next();
        });
    } else {
        res.redirect('/login?error=Authentication required');
    }
};


function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (token) { 
        return res.redirect('/profile');
    }
    next();
}

module.exports = {authenticateJWT , isAuthenticated};