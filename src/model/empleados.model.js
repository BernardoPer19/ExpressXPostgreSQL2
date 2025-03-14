import { pool } from "../db/db.js";

export class ModelEmpleados {
  static async OBTENER_DATOS_TB() {
    try {
      const { rows } = await pool.query("SELECT * FROM empleados");
      return rows;
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      throw error;
    }
  }

  static async OBTENER_DATOS_ID_TB(id) {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM empleados WHERE id = $1 `,
        [id]
      );
      if (rows.length === 0) {
        throw new Error("No se encontró el empleado con el ID proporcionado.");
      }
      return rows[0];
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      throw error;
    }
  }

  static async AÑADIR_DATOS_TB(
    nombre,
    apellido,
    email,
    telefono,
    fecha_contratacion,
    salario,
    departamento
  ) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO empleados (nombre, apellido, email, telefono, fecha_contratacion, salario, departamento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, nombre, apellido",
        [
          nombre,
          apellido,
          email,
          telefono,
          fecha_contratacion,
          salario,
          departamento,
        ]
      );
      return rows[0];
    } catch (error) {
      console.error("Error al agregar empleado:", error);
      throw error;
    }
  }

  static async ELIMINAR_DATOS(id) {
    try {
      const { rows } = await pool.query(
        `DELETE  FROM empleados WHERE id = $1 RETURNING *`,
        [id]
      );

      if (rows.length === 0) {
        throw new Error("No se encontró el empleado con el ID proporcionado.");
      }

      return rows[0];
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      throw error;
    }
  }

  static async ACTUALIZAR_DATOS(
    id,
    nombre,
    apellido,
    email,
    telefono,
    fecha_contratacion,
    salario,
    departamento
  ) {
    const { rows } = await pool.query(
      `UPDATE empleados SET nombre = $1, apellido = $2, email = $3, telefono = $4, fecha_contratacion = $5, salario = $6, departamento = $7 WHERE id = $8 RETURNING nombre, apellido, email, telefono, fecha_contratacion, salario, departamento `,
      [
        id,
        nombre,
        apellido,
        email,
        telefono,
        fecha_contratacion,
        salario,
        departamento,
      ]
    );

    return rows[0];
  }
}
