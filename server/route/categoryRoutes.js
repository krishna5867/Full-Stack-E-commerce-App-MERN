const express = require("express");

const {
    createCategory,
    getAllCategory
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategory", getAllCategory);

module.exports = router;