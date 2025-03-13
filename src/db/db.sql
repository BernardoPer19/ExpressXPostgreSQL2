-- Create the database
CREATE DATABASE empleados;


INSERT INTO empleados (nombre, apellido, email, telefono, fecha_contratacion, salario, departamento) VALUES
('Juan', 'Perez', 'juan.perez@example.com', '123456789', '2023-01-15', 50000.00, 'IT'),
('Maria', 'Gomez', 'maria.gomez@example.com', '987654321', '2023-02-20', 55000.00, 'HR'),
('Carlos', 'Lopez', 'carlos.lopez@example.com', '456789123', '2023-03-10', 60000.00, 'Finance');

SELECT * FROM empleados;


CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(100),
    fecha_contratacion DATE NOT NULL,
    salario NUMERIC(10, 2) NOT NULL,
    departamento VARCHAR(50)
);
