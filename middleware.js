export function logMiddleware(req, res, next) {
    console.log(`${req.method} request was made to path: ${req.path} by IP: ${req.ip}`);
    next();
};
