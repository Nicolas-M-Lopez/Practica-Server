import fs from 'fs'
import product from './index.js'
class CartManager {
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
      if (this.carts.length>0) {
        let next_id = this.carts[this.carts.length-1].id+1
        data.id = next_id
    } else {
        data.id = 1
    }  
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


  getCarts(){
    try{
      if (this.carts === []){
        console.log('Not found')
        return 'Not found'
      } else{
        console.log(this.carts)
        return this.carts
      }
      
    } catch(error){
      console.log('Error al buscar carritos')
      return 'Error al buscar carritos'
    }
  }

  getCartById(pid){
    try{
      const cartExistente = this.carts.find(cart => cart.id === pid)
      if(cartExistente){
        console.log(cartExistente)
        return cartExistente
      }else{
        console.error('Not found')
      }
    } catch (error){
      console.log('Error al buscar el carrito')
      return 'Error al buscar el carrito'
    }
  
  }
  
}
let cart = new CartManager('./data/carts.json')

export default cart
