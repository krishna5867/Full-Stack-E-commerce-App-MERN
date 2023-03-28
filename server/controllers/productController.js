const Product = require("../models/productModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const cloudinary = require('../utils/cloudinary');
const util = require('util');
const upload = util.promisify(cloudinary.uploader.upload);

exports.home = (req, res) => {
    res.send("Hello #Product");
}

//getAllProducts
exports.getProducts = async (req, res) => {
    try {
        const perPage = 5;
        const page = req.query.page || 1;
        const product = await Product.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .populate({
                path: "category",
                select: "name"
            }).populate({
                path: "user",
                select: "name"
            });
        res.status(200).json({
            success: true,
            message: "successfull",
            product,
        })
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}
//get Single Product
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({
            success: true,
            message: "Product found Successfully",
            product
        })
    } catch (error) {
        console.log(error);
    }
}
//create/Add Product
exports.adminAddProduct = async (req, res) => {
    try {
        const user = await User.findOne(req.user);
        const { name, description, price, stock, category } = req.body;
        if (!name) {
            throw new Error("All field must be Required");
        }
        const productExists = await Product.findOne({ name });

        if (productExists) {
            throw new Error("Product Already Exists");
        } else {
            const file = req.files.photo;
            if (!file) {
                throw new Error("A photo is required");
            }

            const result = await upload(file.tempFilePath);
            const product = await Product.create({
                name,
                description,
                price,
                stock,
                category,
                image: {
                    public_id: result.public_id,
                    url: result.secure_url
                },
                user
            });
            await product.save();
            res.status(200).json({
                success: true,
                message: "Product Created Successfully",
                product
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
};

//edit Product
exports.adminEditProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;

        if (!name || !description || !price || !stock) {
            throw new Error("All fields are required");
        }

        const product = await Product.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        const file = req.files.photo;

        if (!file) {
            throw new Error("A photo is required");
        }

        const result = await upload(file.tempFilePath);

        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.image = {
            public_id: result.public_id,
            url: result.secure_url,
        };

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: product,
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

//delete Product
exports.adminDeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// Search
exports.searchProduct = async (req, res) => {
    try {
        const search = req.params.search;
        const product = await Product.find({
            $or: [
                { name: { $regex: search, $options: "i" } }
            ]
        });
        res.status(200).json({
            success: true,
            message: "Search Product Found",
            product
        })
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            success: false,
            message: error.message
        })

    }
}

// Pagination
exports.productCount = async (req, res) => {
    try {
        const totalCount = await Product.find({}).estimatedDocumentCount();
        res.status(200).json({
            success: true,
            message: "Total no of products found",
            totalCount,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Filter based on categories 
exports.getProductByCategory = async (req, res) => {
    try {
        const selectedCategory = req.params.selectedCategory;
        const category = await Category.findOne({ name: selectedCategory });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        const product = await Product.find({ category: category._id }).populate('category');
        res.status(200).json({
            success: true,
            message: 'Success',
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in getting category',
        });
    }
};

// Related Products
exports.getRelatedProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const relatedProducts = await Product.find({
            _id: { $ne: product._id },
            category: product.category,
        });
        res.status(200).json({
            success: true,
            message: "successfull",
            relatedProducts
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "not found",
        })
    }
}

// Comment 
exports.postComment = async (req, res) => {
    const comment = {
        comment: req.body.comment,
        user: req.user.id
    }
    const product = Product.findByIdAndUpdate(req.body.id, {
        $push: { comments: comment }
    },
        { new: true }
        )
        .populate("comments.user", "name email")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({
                    error: err,
                    product,
                    userName
                })
            } else {
                res.json(result)
            }
        })
}









