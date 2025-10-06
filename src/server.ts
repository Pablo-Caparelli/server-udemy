import express from "express";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import db from "./config/db";
import colors from "colors";

//Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
}

const server = express();

server.use(express.json());

server.use("/api/products", router);

// server.get("/api", (req, res) => {
//   res.json({ msg: "Desde API" });
// });

//Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;

// export function sumar() {
//   console.log(3 + 2);
// }
