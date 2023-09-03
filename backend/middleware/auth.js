const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(":")[1].trim();

        if (!token)
            return res
                .status(403)
                .json({
                    Message: "Authorization Revoked . Please provide valid auth-headers",
                });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) return res.status(403).json({ Message: "Token Error" });

        const user = await User.findOne(
            { email: decoded.email },
            { password: 0, tokens: 0 }
        );
        req.user = user;

        next();
    } catch (error) {
        console.log(error)
        return res
            .status(403)
            .json({
                Error: "Authorization Revoked . Please provide valid auth-headers",
            });
    }
};