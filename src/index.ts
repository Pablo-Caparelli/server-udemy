import colors from "colors";
import server from "./server";

const PORT = process.env.PORT || 4000;

// En desarrollo local sigue escuchando el puerto normalmente
if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => {
    console.log(
      colors.cyan.bold(`✅ Server corriendo en http://localhost:${PORT}`),
    );
  });
}

export default server;

// import { sumar } from "./server";
// console.log("Desde index.ts");
// sumar();

//filess.io como render (video369)
//instalaciones:
//1- npm install --save sequelize
//2- npm install --save pg pg-hstore
//3- npm i dotenv
//4- npm i colors
//5- npm i sequelize-typescript
//6- npm i express-validator
//7- npm i -D supertest @types/supertest jest @types/jest ts-jest
//8- npx ts-jest config:init
//9- npm i swagger-jsdoc swagger-ui-express
//10- npm i -D @types/swagger-jsdoc @types/swagger-ui-express

//Jest puede leer archivos de 3 formas:
//-Archivos con la extensión .test.js
//-Archivos con la extensión .spec.js
//-Archivos dentro de la carpeta __tests__

//Como conectarse a dbaver (video 372)

//Testing (Test y Supertest)
//Unit Testing

//npm test -> ejecuta las pruebas
