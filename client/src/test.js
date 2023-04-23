userSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });
        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
//middleware
exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log("Auth Token", token);

        if (!token) {
            return res.status(401).json({ status: 401, message: "Authorization failed:Token missing" })
        };


        const verifyOptions = {
            expiresIn: '1d'
        };

        const verifytoken = jwt.verify(token, process.env.SECRET_KEY, verifyOptions); 
        // console.log('verifytoken',verifytoken);

        const rootUser = await User.findOne({ _id: verifytoken._id });
        // console.log(rootUser, 18);
        if (!rootUser) {
            res.status(401).json({ status: 401, message: "Authorization failed: User not found" });
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (error) {
        console.error(error, 27);
        res.status(401).json({ status: 401, message: "Authorization failed: Invalid token" });
    }
};

//backend
exports.validuser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(201).json({ status: 201, message: "Valid User", validUser: user });
        } else {
            res.status(401).json({ status: 401, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ status: 401, message: "Error in validating user" });

//frontend
        const validUser = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch("/validuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                credentials: "include"
            });
            const data = await response.json();
            console.log(data);

            if (data.status === 401 || !data) {
                console.log("user not valid");
            } else {
                setLoginData(data)
            }