const { imageUploadUtils } = require("../../config/cloudinary");
const Product = require("../../models/Product");


//image upload to cloud
const handleImageUpload = async(req,res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtils(url);

        res.json({
            success: true,
            result,
          });

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error occured while uploading image to cloud"
        })
    }
}

//add a new product 
const addProduct = async(req,res)=>{
    try {
        const {
            image,brand,category,description
            ,price,salePrice,title,totalStock
            } = req.body;
        
        const newlyCreatedProduct = new Product({
            image,brand,category,description
            ,price,salePrice,title,totalStock
        })

        await newlyCreatedProduct.save();
        res.status(201).json({
            success:true,
            data:newlyCreatedProduct,
            message:"data successfully added"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured during adding a new product"
        })
    }
}

//fetch all products 
const fetchAllProducts = async(req,res)=>{
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success:true,
            data:listOfProducts,
            message:"data successfully fetched"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured during adding a new product"
        })
    }
}

//edit product 
const editProduct = async(req,res)=>{
    try {
        const {id} = req.params;

        const {
            image,brand,category,description
            ,price,salePrice,title,totalStock
            } = req.body;

        const findProduct = await Product.findById(id);
        if(!findProduct) {
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice =
          salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        // findProduct.averageReview = averageReview || findProduct.averageReview;

        await findProduct.save();
        res.status(201).json({
            success:true,
            message:"product edited successfully",
            data:findProduct,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured during adding a new product"
        })
    }
}

//delete product
const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured during adding a new product"
        })
    }
}

module.exports = {handleImageUpload , addProduct, fetchAllProducts, editProduct, deleteProduct};