const jwt = require("jsonwebtoken");

const generateAuthtoken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
    });
};

export default generateAuthtoken;