import Product from "../models/Product.js";


export const getProduct = async (req, res) => {
    try {
        const products = await Product.find()

        
            return res.status(200).json(products)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id)

        if (product) {
            return res.status(200).json(product)
        }else{
            res.status(400).json("No product found")
        }

        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createProduct = async(req,res) => {
    try{

        const {name,price,description,image,category,stock,rating} = req.body;
        
        const newProduct = await Product.create({name,price,description,image,category,stock,rating});
        
        res.status(201).json(newProduct)
    }catch(error){
        res.status(400).json(error.message);
    }
}

export const updateProduct = async(req,res) => {
    try {
        const id = req.params.id
        const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.json(updatedProduct)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const deleteProduct = async(req,res) => {
    try{
        const id = req.params.id
        await Product.findByIdAndDelete(id);

        res.json("Deleted")
    }catch(err){
        res.status(400).json({message: err.message})
    }
}