// Importacion de la Clase ProductoEnCarrito
import { ProductoEnCarrito } from './productcart.js';
import { ProductosDelSuper } from './productsuper.js';

// Clase Carrito
// Cada cliente que venga a mi super va a crear un carrito
export class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.productos = [];
        this.categorias = [];
        this.precioTotal = 0;
    }
    
    // función que agrega @{cantidad} de productos con @{sku} al carrito
    async agregarProducto(sku, cantidad, productosDelSuper) {
        // Si lo valores con validos
        if (sku && cantidad) {
            // Busco el producto en el carrito
            console.log(`Buscando el producto ${sku} en el carrito...`);
            const productoExistenteEnCarrito = this.productos.find(producto => producto.sku === sku);

            // Verifico si el producto se encuentera en el carrito sumo la cantidad|
            if (productoExistenteEnCarrito) {
              // Si el producto es encontrado
              console.log(`El producto ${productoExistenteEnCarrito.sku} se encuentra en el carrito...`);

              updateQuantityPrice(productoExistenteEnCarrito);

              // // Modificando la cantidad, el precio y el precio total
              // console.log(`Modificando valores...`);

              // this.precioTotal -= productoExistenteEnCarrito.precio * cantidad;

              // productoExistenteEnCarrito.cantidad += cantidad;
              // this.precioTotal += productoExistenteEnCarrito.precio * productoExistenteEnCarrito.cantidad;
            } else {
                try {
                    // Busco el producto en el super
                    console.log(`Buscando el producto en la base del super... ${sku}`);
                    //const producto = await window.findProductBySkuInProductOfSuper(sku);
                    const productoExistenteEnSuper = await productosDelSuper.findProductBySku(sku);
                    //const producto = await new ProductosDelSuper().findProductBySku(sku);

                    // Verifico si el producto se encuentra en el producto del supermercado
                    // Agrego el producto
                    if (productoExistenteEnSuper) {
                      // Agrega un Producto
                      addProduct(productoExistenteEnSuper);

                      // console.log(`Agregando producto  ${sku} cantidad  ${cantidad}`);
      
                      // // Creo un producto nuevo
                      // const nuevoProducto = new ProductoEnCarrito(sku, productoExistenteEnSuper.nombre, cantidad);
                      // this.productos.push(nuevoProducto);
                      // this.precioTotal += producto.precio * cantidad;
                      // this.categorias.push(producto.categoria);
                    
                      // // Agregado Exitosamente
                      // console.log(`Producto  ${sku} agregado exitosamente...`);
                    } else {
                      console.log(`No se encontró el producto ${sku} en el supermercado.`);
                    }
                  } catch (error) {
                    console.log(error);
                }
            }
        } else {
            console.log("El sku y la cantidad deben ser especificados");
        }
    }

    async eliminarProducto(sku, cantidad) {
        return new Promise((resolve, reject) => {
          // Busco el producto en el carrito
          console.log(`Buscando el producto ${sku} en el carrito...`);
          const productoExistenteCarrito = this.productos.find(producto => producto.sku === sku);
      
          if (productoExistenteCarrito) {
            if (cantidad < productoExistenteCarrito.cantidad) {
              productoExistenteCarrito.cantidad -= cantidad;
            } else {
              const index = this.productosEnCarritoCarrito.indexOf(productoExistenteCarrito);
              this.productosEnCarritoCarrito.splice(index, 1);
            }
            resolve("Producto eliminado del carrito.");
          } else {
            reject(`El producto con SKU ${sku} no existe en el carrito.`);
          }
        });
    }

    updateQuantityPrice(productoExistenteEnCarrito) {
      // Modificando la cantidad, el precio y el precio total
      console.log(`Modificando el cantidad y precio...`);

      this.preciototal -= productoExistenteEnCarrito.precio * cantidad;

      productoExistenteEnCarrito.cantidad += cantidad;
      this.preciototal += productoExistenteEnCarrito.precio * productoExistenteEnCarrito.cantidad;
    }

    addProduct(productoExistenteEnSuper) {
      // 
      console.log(`Agregando producto  ${sku} cantidad  ${cantidad}`);
      
      // Creo un producto nuevo
      const nuevoProducto = new ProductoEnCarrito(sku, productoExistenteEnSuper.nombre, cantidad);
      
      // Agrego el producto
      this.productos.push(nuevoProducto);
      this.precioTotal += producto.precio * cantidad;
      this.categorias.push(producto.categoria);
                    
      // Agregado Exitosamente
      console.log(`Producto  ${sku} agregado exitosamente...`);
    }

    listProducts() {
        console.log('Productos en el carrito:');
        this.productos.forEach((productos) => {
          //console.log(`SKU: ${producto.sku}`);
          //console.log(`Cantidad: ${producto.cantidad}`);
          console.log('------------------------');
        });
    }
    
    listCategories() {
        console.log('Categorias en el carrito:');
        this.productos.forEach((producto) => {
          //console.log(`SKU: ${producto.sku}`);
          //console.log(`Cantidad: ${producto.cantidad}`);
          console.log('------------------------');
        });
    }

    listPrecioTotal() {
        console.log(`Total del carrito: ${this.precioTotal}`);
    }
}