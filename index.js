import fs from 'fs'

class ProductManager{
    constructor(path){
      this.products = []
        this.path = path
        this.init(path)     
    }
    init(path){
      let file = fs.existsSync(path)

      if(!file){
        fs.writeFileSync(path, '[]')
        console.log('file created at path: '+this.path)
        return 'file created at path: '+this.path
      } else {
        this.products = JSON.parse(fs.readFileSync(path, 'UTF-8'))
        console.log('Datos recuperados')
        return 'Datos recuperados'
      }
    }

    async addProduct({title,description,price,thumbnail,stock}){
      try{
        const productExistente = this.products.find(product => product.title === title)
        if(productExistente){
          console.error('Este producto ya se encuentra cargado')
        } else {
      let id
      if (this.products.length === 0) {
        id = 0
      } else {
        let lastProduct = this.products[this.products.length-1]
        id = lastProduct.id + 1
      }
      let product = {id,title,description,price,thumbnail,stock}
      this.products.push(product)
      let productJson = JSON.stringify(this.products, null, 2)
      await fs.promises.writeFile(this.path, productJson)  
    }
      }
    catch(error){
      console.error('Error al agregar el producto')
      return 'Error al agregar el producto'
    }
}

    getProducts(){
      try{
        if (this.products === []){
          console.log('Not found')
          return 'Not found'
        } else{
          console.log(this.products)
          return this.products
        }
        
      } catch(error){
        console.log('Error al buscar productos')
        return 'Error al buscar productos'
      }
        
    }

    getProductById(id){
      try{
        const productExistente = this.products.find(product => product.id === id)
        if(productExistente){
          console.log(productExistente)
          return productExistente
        }else{
          console.error('Not found')
        }
      } catch (error){
        console.log('Error al buscar producto')
        return 'Error al buscar producto'
      }
    
    }

    async updateProduct(id,product) {  
      try {
          let productExistente = this.getProductById(id)
          if(productExistente){
            for (let prop in product) {
              productExistente[prop] = product[prop]
          }
          let productJson = JSON.stringify(this.products,null,2)
          await fs.promises.writeFile(this.path,productJson)
          console.log('Producto actualizado: '+id)
          return 'Producto actualizado: '+id
          } else{
            console.log('Not found')
            return 'Not found'
          }
         
      } catch(error) {
          console.log(error)
          return 'Error al actualizar el producto'
      }
  }

  async deleteProduct(id) {
    try {
        if(this.getProductById(id)){
          this.products = this.products.filter(each=>each.id!==id)
          let productJson = JSON.stringify(this.products,null,2)
          await fs.promises.writeFile(this.path,productJson)
          console.log('Producto eliminado: '+id)
          return 'Producto eliminado: '+id
        } else{
          console.log('Not found')
          return 'Not found'
        }
    } catch(error) {
        console.log(error)
        return 'Error al eleiminar el producto'
    }
}
}

let product = new ProductManager('./data/products.json')


/* class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.init(path);
  }

  init(path) {
    let file = fs.existsSync(path);

    if (!file) {
      fs.writeFileSync(path, '[]');
      console.log('file created at path: ' + this.path);
      return 'file created at path: ' + this.path;
    } else {
      this.carts = JSON.parse(fs.readFileSync(path, 'UTF-8'));
      console.log('Datos recuperados');
      return 'Datos recuperados';
    }
  }

  async addCart({ productId, quantity }) {
    try {
      console.log("productId: ", productId);
      let producto = await product.getProductById(productId).title;
      console.log(producto);
      let data = { producto, quantity };
      console.log(data);
      let nextCartId = 1;
      if (this.carts.length > 0) {
        console.log('entre al if');
        nextCartId = this.carts[this.carts.length - 1].id + 1;
      }
  
      data.id = nextCartId;
      this.carts.push(data);
      let data_json = JSON.stringify(this.carts, null, 2);
      console.log(data_json);
      await fs.promises.writeFile(this.path, data_json);
      console.log('cart id created: ' + data.id);
      return data;
    } catch (error) {
      console.log(error);
      return 'Error: Creating cart';
    }
  }  
}

async function cartMang(){
  let cart = new CartManager('./data/carts.json')
  await cart.addCart({productId: 1, quantity:2})
}

cartMang() */


export default product
