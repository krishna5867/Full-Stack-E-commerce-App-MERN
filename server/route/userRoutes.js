const express = require("express");
const {auth, customizeRole } = require('../middleware/auth');

const {
    home,
    createUser,
    login,
    getUser,
    signout,
    isloggedin,
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
router.get("/getUser/:id",auth, getUser);``
router.post("/login", login);
router.post("/signout",auth, signout);
router.get("/isloggedin",auth, isloggedin);

router.post("/forgotPassword", forgotPassword);
router.post("/passwordReset/:token", passwordReset);
router.put("/changePassword", auth, changePassword);

//admin
router.get("/admin/getUsers", auth, customizeRole('admin'), adminGetUsers);
router.put("/admin/editUser/:id",auth, customizeRole('admin'), admineditUser);
router.delete("/admin/deleteuser/:id",auth, customizeRole('admin'), admindeleteUser);

module.exports = router;
