const Product = require("../model/products");

const Name=require("../model/scroll")

const productPagination = async (req, res) => {
  try {
    const productPerPage = req.query.productPerPage
      ? parseInt(req.query.productPerPage)
      : 3;
    //PageNumber From which Page to Start
    const pageNumber = Math.max(parseInt(req.query.page) || 1, 1);

    const skip = (pageNumber - 1) * productPerPage;
    const products = await Product.find()
      //skip takes argument to skip number of entries
      .sort({ _id: 1 })
      .skip(skip)
      //limit is number of Records we want to display
      .limit(productPerPage);

    const totalProducts = await Product.countDocuments();
    const totalpages=Math.ceil(totalProducts / productPerPage)

    return res.status(200).json({
      products,
      totalProducts,
      currentPage: pageNumber, 
      totalPages: totalpages,
    });
  } catch (err) {
    return res.status(500).send({
      err: err.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { id, name, price, description, category, stock, image } = req.body;

    if (!name || !price || !description || !category) {
      return res
        .status(400)
        .json({ message: "All fields are required except stock." });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists." });
    }

    const newProduct = new Product({
      id,
      name,
      price,
      description,
      category,
      stock: stock || 0,
      image,
    });

    await newProduct.save();
    console.log(newProduct);
    return res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(201).json(products);
    // console.log(products)
  } catch (err) {
    // console.error(err);
    return res.status(500).send("Server Error");
  }
};

// This function will update all products in the database
const updateProducts = async (req, res) => {
  try {
    // Use updateMany to remove the 'id' field from all products
    const result = await Product.updateMany({}, { $unset: { quantity:0 } });

    console.log(`Updated ${result.modifiedCount} products.`);
    return res.status(200).json({
      message: `${result.modifiedCount} products updated successfully.`,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in updating products",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "Product delete Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a product by ID
const getProductById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const product = await Product.findOne({ id: parseInt(id) });
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const infiniteScroll = async (req, res) => {
  try {
    const limit= Math.max(parseInt(req.query.limit) || 5, 1);
    const pageNumber = Math.max(parseInt(req.query.page) || 1, 1);

    const skip = (pageNumber - 1) * limit;

    // Fetch paginated products
    const names = await Name.find()
      .sort({ _id: 1 }) // Sort by _id in ascending order
      .skip(skip)
      .limit(limit);

    const totalNames = await Name.countDocuments();
    const totalPages = Math.ceil(totalNames / limit);
    const hasMore = pageNumber < totalPages;

    return res.status(200).json({
      success: true,
      names,
      totalNames,
      currentPage: pageNumber,
      totalPages,
      hasMore,
      perPage: limit,
    });
  } catch (error) {
    console.error("Error in productPagination:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getNames = async (req, res) => {
  try {
    const names = await Name.find();
    // console.log(names)
    return res.status(201).json(names);
    // console.log(products)
  } catch (err) {
    // console.error(err);
    return res.status(500).send("Server Error");
  }
};


module.exports = {
  productPagination,
  addProduct,
  getProducts,
  updateProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  infiniteScroll,
  getNames
};
