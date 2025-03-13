import { Router } from "express";
import { añadirEmplados, eliminarEmpleados, obtenerEmpleados, obtenerEmpleadosPorId } from "../controllers/Empleados.controller.js";


export const rutasEmpleados = Router()


rutasEmpleados.get("/", obtenerEmpleados)
rutasEmpleados.get("/:id", obtenerEmpleadosPorId)
rutasEmpleados.post("/", añadirEmplados)
rutasEmpleados.delete("/:id", eliminarEmpleados)
// rutasEmpleados.put("/:id", actualiszarDatosEmpleados)

