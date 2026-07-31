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
    // Peticiones sin origen (Postman, ejecuciones servidor a servidor, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Lista de orígenes permitidos
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "https://frontend-udemy.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ];

    // Compara ignorando si hay o no una barra '/' al final
    const cleanOrigin = origin.replace(/\/$/, "");
    const isAllowed = allowedOrigins.some(
      (url) => url && url.replace(/\/$/, "") === cleanOrigin,
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(
        new Error(`Error de CORS: El origen ${origin} no está permitido`),
      );
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
