Plataforma web Din Express
===
# Tabla de contenidos

- [Plataforma web Din Express](#plataforma-web-din-express)
- [Tabla de contenidos](#tabla-de-contenidos)
  - [Información del código ](#información-del-código-)
  - [Jerarquía de directorios](#jerarquía-de-directorios)
  - [Iniciar el proyecto](#iniciar-el-proyecto)
    - [Archivo de variables de entorno (.env)](#archivo-de-variables-de-entorno-env)
    - [Instalación de paquetes y ejecución del servidor de desarrollo](#instalación-de-paquetes-y-ejecución-del-servidor-de-desarrollo)
    - [Requisitos](#requisitos)
    - [Instalación](#instalación)

## Información del código <a name = "about"></a>
- Title:  `Plataforma web de Din Express`
- Authors:  `Erick Hernández Silva`
- Lenguaje: `Javascript`
- Framework: `NextJS.`

## Jerarquía de directorios
El proyecto se organiza de la siguiente forma:

```
|—— .env
|—— public
|    |—— contrato.pdf
|    |—— favicon.ico
|    |—— favicon.png
|    |—— logo2.jpg
|—— src
|    |—— app
|        |—— auth
|            |—— login
|                |—— page.jsx
|        |—— empleados
|            |—— nuevo
|                |—— page.jsx
|            |—— page.jsx
|            |—— [id]
|                |—— page.jsx
|        |—— favicon.ico
|        |—— globals.css
|        |—— layout.js
|        |—— operadores
|            |—— nuevo
|                |—— page.jsx
|            |—— page.jsx
|            |—— [id]
|                |—— page.jsx
|        |—— page.js
|        |—— quejas-y-sugerencias
|            |—— nueva
|                |—— page.jsx
|            |—— page.jsx
|        |—— reportes
|            |—— page.jsx
|        |—— solicitudes
|            |—— page.jsx
|        |—— tyc
|            |—— page.jsx
|            |—— tyc.module.css
|    |—— components
|        |—— AuthComponent.jsx
|        |—— Buttons
|            |—— ArrowButton.jsx
|        |—— dialCodes.jsx
|        |—— MenuPrincipal.jsx
|        |—— Modal
|            |—— Modal.jsx
|            |—— Modal.module.css
|        |—— Navbar
|            |—— Navbar.jsx
|            |—— Navbar.module.css
|        |—— Table
|            |—— dataTable.jsx
|        |—— ui
|            |—— button.jsx
|            |—— checkbox.jsx
|            |—— input.jsx
|            |—— table.jsx
```
Para saber más del archivo .env, consultar [Archivo de variables de entorno (.env)](#archivo-de-variables-de-entorno-env).
Adentro de la carpeta `/public` tenemos los assets estáticos del sitio.
```
|—— public
|    |—— contrato.pdf
|    |—— favicon.ico
|    |—— favicon.png
|    |—— logo2.jpg
```
Dentro de la carpeta `/src/` encontramos dos carpetas: `app` y `components`. Dentro de `/src/app` podemos encontrar la siguiente estructura:
```
|—— src
|    |—— app
|        |—— auth
|            |—— login
|                |—— page.jsx
|        |—— empleados
|            |—— nuevo
|                |—— page.jsx
|            |—— page.jsx
|            |—— [id]
|                |—— page.jsx
|        |—— favicon.ico
|        |—— globals.css
|        |—— layout.js
|        |—— operadores
|            |—— nuevo
|                |—— page.jsx
|            |—— page.jsx
|            |—— [id]
|                |—— page.jsx
|        |—— page.js
|        |—— quejas-y-sugerencias
|            |—— nueva
|                |—— page.jsx
|            |—— page.jsx
|        |—— reportes
|            |—— page.jsx
|        |—— solicitudes
|            |—— page.jsx
|        |—— tyc
|            |—— page.jsx
|            |—— tyc.module.css
```
* Donde en la carpeta `/auth` tendremos una carpeta `/login` donde encontraremos el archivo JSX con la lógica del login.
* Dentro de `/empleados` tendremos:
  * `/nuevo/page.jsx`: donde encontraremos la lógica para generar un nuevo empleado. Unicamente los operadores tienen acceso.
  * `page.jsx`: donde encontraremos la logica para visualziar a todos los empleados. Operadores y gerentes tienen acceso.
  * `/[id]/page.jsx`: donde encontraremos la lógica para obtener los datos de un empleado y actualziaar sus datos. Únicamente los gerentes tienen acceso.
* `/favicon.ico` es el ícono favicon.
* `/globals.css` tiene la configuración de css de manera global.
* `/layout.js` tiene la configuración del layout de todo el sitio.
* `/operadores` contiene la lógica de gestión de operadores y tiene la siguiente estructura:
  * `/nuevo/page.jsx`: contiene la lógica para realizar un registro de operador. Únicamente los gerentes tienen acceso.
  * `/page.jsx`: contiene la lógicas para visualizar los datos de los operadores dados de alta. Únicamente los gerentes tienen acceso.
  * `/[id]/page.jsx`: contiene la lógica para visualizar todos los datos del operador, editarlos, cambiar contraseña o eliminarlo. Únicamente los gerentes tienen acceso.
* `/page.js`: contiene la lógica de la pantalla principal del sitio. Únicamente gerentes y operadores tienen acceso.
* `/quejas-y-sugerencias` contiene la lógica para gestionar las quejas y sugerencias del sistema, que tiene la siguiente estructura:
  * `/nueva/page.jsx`: contiene la lógica para dejar una queja o sugerencia. Esta ruta no está protegida, por lo que se puede acceder fácilmente a ella.
  * `/page.jsx`: contiene la lógica para visualizar todas las quejas y sugerencias hechas por los usuarios. Únicamente los gerentes tienen acceso.
* `/reportes`: contiene la lógica para visualizar los reportes y descargar los datos. Únicamente los gerentes tienen acceso.
* `/solicitudes`: contiene la lógica para visualizar las solicitudes. Los gerentes pueden marcar como "pagada" una solicitud, y los operadores cancelar las solicitudes.
* `/tyc`: contiene la lógica necesaria para que los usuarios solicitantes expidan explícitamente su conocimiento de los términos y condiciones de la plataforma.


La carpeta `/components` se organiza de la siguiente manera:
```
|—— .env
|—— public
|    ....
|—— src
|    |—— app
|        ....
|    |—— components
|        |—— AuthComponent.jsx
|        |—— Buttons
|            |—— ArrowButton.jsx
|        |—— dialCodes.jsx
|        |—— MenuPrincipal.jsx
|        |—— Modal
|            |—— Modal.jsx
|            |—— Modal.module.css
|        |—— Navbar
|            |—— Navbar.jsx
|            |—— Navbar.module.css
|        |—— Table
|            |—— dataTable.jsx
|        |—— ui
|            |—— button.jsx
|            |—— checkbox.jsx
|            |—— input.jsx
|            |—— table.jsx
```
* `/AuthComponent.jsx`: incluye toda la lógica de autentificación de usuarios y protección de rutas.
* `/Buttons.jsx`: incluye un componente reutilizable para generar botones.
* `/dialCodes.jsx`: tiene una función que exporta todos los códigos de país.
* `/MenuPrincipal.jsx`: tiene toda la lógica del menú principal que se muestra en la ruta raíz del sitio y como menú desplegable en móvil.
* `/Modal/Modal.jsx`: tiene la lógica para desplegar modales en el sitio web
* `/Navbar/Navbar.jsx`: tiene la lógica para tener la barra de navegación superior.
* `/Table/dataTable.jsx`: contiene la lógica para renderizar las tablas que se muestran en todo el sitio.
* `/ui/...`: contiene componentes de la librería de shadcn/ui


## Iniciar el proyecto<a name = "getting_started"></a>
### Archivo de variables de entorno (.env)
Es necesario tener un archivo de variables de entorno del siguiente modo:

```
NEXT_PUBLIC_backEnd = "https://miApi.com/"
```

La variable `NEXT_PUBLIC_backEnd` es obligatoria y debe tener como valor el endpoint raíz de l backend que servira las peticiones. Es INDISPENSABLE que el URL termine con una diagonal (/).

### Instalación de paquetes y ejecución del servidor de desarrollo
1. Clonar el repositorio actual
2. Ejecutar `npm i` para instalar las dependencias necesarias
3. Abrir el folder contenedor
4. Ejecutar `npm run dev` para iniciar el servidor local

### Requisitos

Se requieren instalar las siguientes dependencias para poder ejecutar el servidor: 
- NodeJS.
  
Una vez se tenga instalado NodeJS, ejecutar el comando `npm i` para instalar las demás dependencias del proyecto.


### Instalación
Se puede utilizar un servicio de despliegue como Vercel para desplegar fácilmente la aplicación. Sin embargo,
también se puede utilizar un servidor privado y utilizar NGINX.

Para tener el servidor de produccion es requerido ejecutar
```
npm run build
```

seguido de
``` 
npm run start
```
para ejecutar el servidor de producción.
