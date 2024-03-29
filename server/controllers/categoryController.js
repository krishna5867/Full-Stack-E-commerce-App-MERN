const Category = require("../models/categoryModel")

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).json({
                success: 'false',
                message: "Name is required"
            });
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(200).json({
                success: false,
                message: "Category Already Exisits",
            });
        }
        const category = await new Category({
            name,
        }).save();
        res.status(201).json({
            success: true,
            message: "New category created successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: 'false',
            message: "error.message",
        });
    }
};

// get all categories
exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting all categories",
        });
    }
};

// Edit Category
exports.editCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id);
        res.status(200).json({
            success: true,
            message: "Category edited successfully",
            category
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

//delete category
exports.deleteCategory = async (req, res) => {
    try {
        const id  = req.params.id;
        const category = await Category.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "category Not deleted",
        });
    }
};


//     try {
//         const { name } = req.body;
//         const { id } = req.params;
//         const category = await categoryModel.findByIdAndUpdate(
//             id,
//             { name, slug: slugify(name) },
//             { new: true }
//         );
//         res.status(200).send({
//             success: true,
//             messsage: "Category Updated Successfully",
//             category,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Error while updating category",
//         });
//     }
// };