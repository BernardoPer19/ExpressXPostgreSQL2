import { ModelEmpleados } from "../model/empleados.model.js";
import { validateEmpleado } from "../schema/emplados-esquema.js";
export const obtenerEmpleados = async (req, res) => {
  try {
    const result = await ModelEmpleados.OBTENER_DATOS_TB();
    res.json(result);
  } catch (error) {
    console.error("Error en obtenerEmpleados:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los datos. Intente nuevamente." });
  }
};

export const obtenerEmpleadosPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ModelEmpleados.OBTENER_DATOS_ID_TB(id);
    res.json(result);
  } catch (error) {
    console.error("Error en obtenerEmpleados:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los datos. Intente nuevamente." });
  }
};

export const añadirEmplados = async (req, res) => {
  try {
    const validarDatatos = validateEmpleado(req.body);

    if (!validarDatatos.success) {
      return res.status(400).json({ message: "Datos inválidos", errors: validarDatatos.errors });
    }

    const { nombre, apellido, email, telefono, fecha_contratacion, salario, departamento } = validarDatatos.data;

    const result = await ModelEmpleados.AÑADIR_DATOS_TB(
      nombre,
      apellido,
      email,
      telefono,
      fecha_contratacion,
      salario,
      departamento
    );

    if (!result) {
      throw new Error("Error al agregar el empleado");
    }

    return res.status(201).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error al agregar el empleado: ${error.message}` });
  }
};

export const eliminarEmpleados = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ModelEmpleados.ELIMINAR_DATOS(id);

    return res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `Error al elimiar el empleado: ${error.message}`,
    });
  }
};

export const actualiszarDatosEmpleados = async (req, res) => {
  try {
    const { id } = req.params;
    const validarActualizacion = validateEmpleado(req.body);

    if (!validarActualizacion.success) {
      return res.status(400).json({ message: "Datos inválidos", errors: validarActualizacion.errors });
    }

    const { nombre, apellido, email, telefono, fecha_contratacion, salario, departamento } = validarActualizacion.data;

    const result = await ModelEmpleados.ACTUALIZAR_DATOS(
      id,
      nombre,
      apellido,
      email,
      telefono,
      fecha_contratacion,
      salario,
      departamento
    );

    if (!result) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(result);
  } catch (error) {
    res.status(500).json({ message: `Error al actualizar el empleado: ${error.message}` });
  }
};
