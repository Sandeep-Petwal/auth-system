// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err); // Log the error for debugging
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        status: false,
        message: "An unexpected server error occurred.",
    });
};
 
module.exports = errorHandler;
