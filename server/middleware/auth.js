const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    let token = req.cookies.token || req.body.token;
    console.log("Token ->", token);
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '');
    }
    if (!token) {
        return res.status(403).send('Token is missing');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            _id: decoded.user_id,
            role: decoded.user_role,
        };
        next();
    } catch (error) {
        res.status(403).send(error.message)
    }
}


exports.customizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(401).send({ error: "Only admin is authorized to access this particular route" });
        }
        next();
    };
};


