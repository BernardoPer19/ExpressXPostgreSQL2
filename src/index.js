import express from "express";
import morgan from "morgan";
import { PORT } from "./confing.js";
import { rutasEmpleados } from "./routes/empleados.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));



app.use("/empleados", rutasEmpleados);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
