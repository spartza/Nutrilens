// Ye hamara main error catcher hai. App mein kahin bhi error aayegi, wo ghoom kar yahan aayegi.
const errorHandler = (err, req, res, next) => {
    // Agar status code galti se 200 (Success) reh gaya hai, toh usko 500 (Server Error) bana do
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Agar mongoose ka CastError hai (jaise galat format ki MongoDB ID pass kardi)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        err.message = 'Resource not found';
    }

    res.status(statusCode).json({
        success: false,
        message: err.message,
        // Stack trace sirf development mein dikhega taaki hacker ko hamare folder structure ka pata na chale
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack 
    });
};

module.exports = { errorHandler };