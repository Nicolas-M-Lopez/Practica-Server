    En esta ocacion vamos a hacer nuestro propio servidor utilizando routes para configurar los endpoints e implementando middlewares para los errores (cliente/servidor)
Para eso sera necesario utilizar el framework Express.js, usando el comando npm install express.
Creamos un nuevo archivo javascript para el servidor, importamos el modulo de express, definimos un servidor ejecutando el modulo y configuramos el metodo listen para poder inicializar el servidor. En esta ocacion vamos a tener que instalar websocket para poder interactuar con el cliente en tiempo real. Creamos los endpoints necesarios para cada metodo dentro de las funciones de carts y products. A parte tenemos que crear un endopoint mas para poder ingresar al Chatbot, aca es donde se implementa websocket
Ya a partir de aca, nos ocupamos del lado cliente. Vamos a empezar instalando handlebars y configuramos las vistas necesarias con sus respectivos endpoints.
Una vez ya configurado todo, vamos al navegador, colocamos en la url "http://localhost:8080/" para entrar a la pagina de inicio(Antes de entrar tuviste que configurar las vistas con Handlebars). Ya todo deberia estar funcionando correctamente



