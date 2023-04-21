const express = require("express");
const {auth, customizeRole } = require('../middleware/auth');

const {
    home,
    createUser,
    login,
    getUser,
    signout,
    validuser,
    forgotPassword,
    passwordReset,
    changePassword,
    adminGetUsers,
    admineditUser,
    admindeleteUser
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", home);
router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getUser/:id",auth, getUser);``
router.post("/signout",auth, signout);
router.get("/validuser",auth, validuser);

router.post("/forgotPassword", forgotPassword);
router.post("/passwordReset/:token", passwordReset);
router.put("/changePassword", auth, changePassword);

//admin
router.get("/admin/getUsers", auth, customizeRole('admin'), adminGetUsers);

const getAllUsers = async () => {
    const res = await axios.get('/admin/getUsers');
    if (res.status === 200) {
        setUsers(res.data.users);
    }
}
router.put("/admin/editUser/:id",auth, customizeRole('admin'), admineditUser);
router.delete("/admin/deleteuser/:id",auth, customizeRole('admin'), admindeleteUser);

module.exports = router;


