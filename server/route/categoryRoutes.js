const express = require("express");
const {auth, customizeRole } = require('../middleware/auth');

const {
    createCategory,
    getAllCategory,
    editCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/createCategory",auth, customizeRole('admin'), createCategory);
router.get("/getAllCategory", getAllCategory);
router.put("/editCategory/:id",auth, customizeRole('admin'), editCategory);
router.delete("/deleteCategory/:id",auth, customizeRole('admin'), deleteCategory);

module.exports = router;