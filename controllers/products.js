const Product = require('../models/product')

const getAllProductsStatic = async (req, res) =>{
    
const products = await Product.find({
    name: 'dining table'
})
res.status(200).json(products)
}

//get All Products
const getAllProducts = async (req, res) =>{
   const { featured, company, name, sort} = req.query
   const queryObject = {}
   if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
   if(company){
       queryObject.company = company
   }
   if(name){
    queryObject.name = { $regex: name, $options: 'i' }
}
  
let result = Product.find(queryObject);
if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

    const getAllProducts = await result;
    res.status(200).json({getAllProducts, nbHits:getAllProducts.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}