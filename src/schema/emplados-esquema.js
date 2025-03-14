import { z } from 'zod';

const empleadoSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido").max(100, "El nombre es demasiado largo"),
    apellido: z.string().min(1, "El apellido es requerido").max(100, "El apellido es demasiado largo"),
    email: z.string().email("El email no es válido"),
    telefono: z.string().max(100, "El teléfono es demasiado largo"),
    fecha_contratacion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato YYYY-MM-DD"),
    salario: z.preprocess((val) => Number(val), z.number().positive("El salario debe ser un número positivo")),
    departamento: z.string().min(1, "El departamento es requerido").max(100, "El departamento es demasiado largo")
});

export const validateEmpleado = (data) => {
    const result = empleadoSchema.safeParse(data);
    if (!result.success) {
        return { success: false, errors: result.error.errors };
    }
    return { success: true, data: result.data };
};

export default empleadoSchema;
