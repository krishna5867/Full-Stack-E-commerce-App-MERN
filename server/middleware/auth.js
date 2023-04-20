const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const keysecret = process.env.SECRET_KEY;

exports.auth = async (req, res, next) => {

    try {
        const token = req.get('Authorization').split('Bearer ')[1];
        console.log(token, '<- auth Token');
        if (!token) {
            throw new Error('Authorization failed: Token missing');
        }
        const verifytoken = jwt.verify(token, keysecret);
        const rootUser = await User.findOne({ _id: verifytoken._id });
        if (!rootUser) {
            throw new Error("Authorization failed: User not found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ status: 401, message: error.message });
    }
};



exports.customizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(401).send({ error: "Only admin is authorized to access this particular route" });
        }
        next();
    };
};


