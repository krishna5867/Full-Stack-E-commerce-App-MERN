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
    adminEditUser,
    adminDeleteUser
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", home);
router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getUser/:id",auth, getUser);
router.get("/signout",auth, signout);
router.get("/validuser",auth, validuser);

router.post("/forgotPassword", forgotPassword);
router.post("/passwordReset/:token", passwordReset);
router.put("/changePassword", auth, changePassword);

//admin
router.get("/admin/getUsers", auth, customizeRole('admin'), adminGetUsers);
router.put("/admin/editUser/:id",auth, customizeRole('admin'), adminEditUser);
router.delete("/admin/deleteuser/:id",auth, customizeRole('admin'), adminDeleteUser);

module.exports = router;


