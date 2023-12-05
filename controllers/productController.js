import mongoose from "mongoose";
import { Product } from "../models/product.js";

export async function createProduct(req, res) {
  try {
    const body = req.body;
    const createdProduct = await Product.create(body);
    res.json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar produto" });
  }
}

export async function editProduct(req, res) {
  try {
    const body = req.body;
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "ID de produto inválido" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar produto" });
  }
}

export async function listAllProducts(req, res) {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
}

export async function listProductsByCategory(req, res) {
  try {
    const category = req.params.category;

    if (!isValidCategory(category)) {
      return res.status(400).json({ error: "Categoria inválida" });
    }

    const productsInCategory = await Product.find({ category });
    res.json(productsInCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar produtos por categoria" });
  }
}

function isValidCategory(category) {
  const validCategories = ["sobremesa", "salgado", "lanche", "bebida"];
  return validCategories.includes(category);
}
