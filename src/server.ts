import express from "express";
import dotenv from "dotenv";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

dotenv.config();

//Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
    console.error(error);
  }
}

connectDB();

const server = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else if (!origin) {
      console.log("Permitir peticiones sin origen");
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
  },
};
server.use(cors(corsOptions));

//Leer datos de formularios
server.use(express.json());

server.use(morgan("dev"));
server.use("/api/products", router);

// server.get("/api", (req, res) => {
//   res.json({ msg: "Desde API" });
// });

//Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions),
);

export default server;

// export function sumar() {
//   console.log(3 + 2);
// }
