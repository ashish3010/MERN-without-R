const Product = require('../models/product')

exports.addProduct = async (req, res) => {
  const { name, image, brand, new_price, old_price, category } = req.body
  let products = await Product.find({})
  let id;
  if (products.length > 0) {
    const lastProductArr = products.slice(-1)
    const lastProduct = lastProductArr[0]
    id = lastProduct.id + 1;
  } else {
    id = 1
  }

  const product = new Product({
    id, name, image, brand, new_price, old_price, category
  });

  await product.save()
  res.json({
    success: true,
    product
  })
}

exports.newlyAdded = async (req, res) => {
  const products = await Product.find({})
  const newlyAdded = products.slice(1).slice(-8)
  res.send({
    success: true,
    products: newlyAdded
  })
}

exports.deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id })
  res.json({
    success: true,
    message: 'Product deleted succesfully'
  })
}

exports.getAllProducts = async (req, res) => {
  let products = await Product.find({})
  res.send({
    success: true,
    products
  })
}