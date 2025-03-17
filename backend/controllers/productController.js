import  {
      create,
      getAll,
      getSingle,
      update,
      remove,}from "../service/crudProduct.js";
import Product from "../models/productModel.js";
export const createProduct = create(Product) ;
export const  getAllProducts = getAll(Product);
export const getSingleProduct = getSingle(Product);
export const updateProduct = update(Product);
export const deleteProduct= remove (Product);