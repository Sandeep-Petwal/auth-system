const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 100,
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})

module.exports = limiter
