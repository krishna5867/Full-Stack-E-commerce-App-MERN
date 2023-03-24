const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    const token = req.cookies.token || req.body.token;
    if (!token && req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "");
    }
    if (!token) {
        return res.status(403).send('Token is missing')
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decode, "decode");
        req.user = {
            id: decode.user_id,
            role: decode.user_role
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


