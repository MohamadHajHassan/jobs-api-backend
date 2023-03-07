const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized");

const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Unauthorized to access this route!");
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userID: payload.userID, name: payload.name };
        next();
    } catch (error) {
        throw new UnauthorizedError("Unauthorized to access this route!");
    }
};

module.exports = authentication;
