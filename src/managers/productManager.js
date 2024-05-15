import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8")//lo lee y guarda en formato json
        return JSON.parse(products);//lo retorno en formato js
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const product = {
        id: uuidv4(),//le asiga un id 
        status: true,
        ...obj,//le asigna el objeto recibido
      };
      const products = await this.getProducts();
      products.push(product);//pushea el objecto creado en el array del archivo
      await fs.promises.writeFile(this.path, JSON.stringify(products));//aca lo escribe
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productExist = products.find((p) => p.id === id);
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(obj, id) {
    try {
      const products = await this.getProducts();
      let productExist = await this.getProductById(id);
      if (!productExist) return null;
      productExist = { ...productExist, ...obj };
      const newArray = products.filter((u) => u.id !== id);
      newArray.push(productExist)
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    if (products.length > 0) {
      const productExist = await this.getProductById(id);
      if (productExist) {
        const newArray = products.filter((u) => u.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
        return productExist
      } 
    } else return null
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("archivo eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}