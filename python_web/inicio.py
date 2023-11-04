import requests

productos_api_url = "http://localhost:3000/productos"

carrito_api_url = "http://localhost:3000/carritocompra"

def ver_productos():
    response = requests.get(productos_api_url)

    if response.status_code == 200:
        productos = response.json()
        print("Lista de Productos:")
        for producto in productos:
            print(
                f"{producto['id']}: {producto['nombre']} - Precio: {producto['precio']} -  Descripcion: {producto['descripcion']} -  Cantidad: {producto['stock']} -  Categoria: {producto['categoria']}")
    else:
        print("Error al obtener la lista de productos.")

def guardar_producto():
    nombre = input("Nombre del producto: ")
    precio = float(input("Precio del producto: "))
    descripcion = input("Descripcion del producto: ")
    stock = int(input("Cantidad del producto: "))
    categoria = input("Categoria del producto: ")

    nuevo_producto = {
        "nombre": nombre,
        "precio": precio,
        "descripcion": descripcion,
        "stock": stock,
        "categoria": categoria
    }

    response = requests.post(productos_api_url, json=nuevo_producto)

    if response.status_code == 201:
        print("Producto guardado exitosamente.")
    else:
        print("Error al guardar el producto.")

def agregar_al_carrito():
    ver_productos()
    producto_id = input("Seleccione el ID del producto que desea agregar al carrito: ")
    cantidadproducto = int(input("Cantidad a agregar al carrito: "))

    # Verifica si el carrito existe para el usuario (no tiene usuarios xd, así que todo funciona para el primer usuario, si quiere puede cambiar el id y se va a crear uno nuevo en su carrito)
    carrito_existente = verificar_carrito_existente(2)
    if carrito_existente:
        informacion_carrito = carrito_existente.json()
    else:
        informacion_carrito = None
        
    producto_info_url = f"{productos_api_url}/{producto_id}"
    response = requests.get(producto_info_url)
        
    if response.status_code == 200:
        producto = response.json()
        precio = producto.get("precio")
        subtotalproducto = precio * cantidadproducto
        subtotal = informacion_carrito[0]["subtotal"] + subtotalproducto if  informacion_carrito != None else subtotalproducto
        cantidad = informacion_carrito[0]["cantidad"] + cantidadproducto if  informacion_carrito != None else cantidadproducto
        print(f"Producto agregado al carrito:\nNombre: {producto['nombre']}\nCantidad: {cantidadproducto}\nSubtotal: {subtotalproducto}")
        
        if carrito_existente:
            actualizar_carrito(producto_id, cantidad, subtotal, 2)  # "1" es el ID de usuario
        else:
            guardar_carrito(producto_id, cantidad, subtotal, 2)  # "1" es el ID de usuario
    else:
        print("Error al obtener la información del producto.")

def verificar_carrito_existente(id_usuario):
    carrito_url = f"{carrito_api_url}/{id_usuario}"
    response = requests.get(carrito_url)

    if response.status_code == 200:
        return response  # El carrito existe
    else:
        return False  # El carrito no existe
    
def visualizar_carrito(id_usuario):
    carrito_url = f"{carrito_api_url}/{id_usuario}"
    response = requests.get(carrito_url)

    if response.status_code == 200:
        carrito = response.json()
                
        print("\nCarrito de Compras: \n")
        print(f"ID: {carrito[0]['id']} - Cantidad Productos: {carrito[0]['cantidad']} - Subtotal: {carrito[0]['subtotal']} - ID Usuario: {carrito[0]['idusuario']}")
        
        print("\nProductos del carrito: \n")
        productosCarrito = carrito[0].get("idproducto")
        print("Productos:")
        for producto in productosCarrito:
            print(
                f"{producto['id']}: {producto['nombre']} - precio: {producto['precio']} - descripcion: {producto['descripcion']} - categoria: {producto['categoria']}")
    else:
        print("Error al obtener el carrito.")

def actualizar_carrito(producto_id, cantidad, subtotal, id_usuario):
    carrito_data = {
        "idproducto": [producto_id],
        "cantidad": cantidad,
        "subtotal": subtotal,
        "idusuario": id_usuario
    }
    
    carrito_url = f"{carrito_api_url}/{id_usuario}"
    response = requests.patch(carrito_url, json=carrito_data)

    if response.status_code == 200:
        print("Carrito actualizado exitosamente.")
    else:
        print("Error al actualizar el carrito.")

def guardar_carrito(producto_id, cantidad, subtotal, id_usuario):
    carrito_data = {
        "idproducto": [producto_id],
        "cantidad": cantidad,
        "subtotal": subtotal,
        "idusuario": id_usuario
    }
    
    response = requests.post(carrito_api_url, json=carrito_data)

    if response.status_code == 201:
        print("Producto agregado al carrito exitosamente.")
    else:
        print("Error al guardar el producto en el carrito.")


def main():
    while True:
        print("\nOpciones:")
        print("1. Ver Productos")
        print("2. Guardar Producto")
        print("3. Agregar al Carrito")
        print("4. Ver Carrito")
        print("5. Salir")

        opcion = input("\nSeleccione una opción: ")

        if opcion == "1":
            ver_productos()
        elif opcion == "2":
            guardar_producto()
        elif opcion == "3":
            agregar_al_carrito()
        elif opcion == "4":
            visualizar_carrito(2)
        elif opcion == "5":
            break
        else:
            print("Opción no válida. Intente de nuevo.")

if __name__ == "__main__":
    main()