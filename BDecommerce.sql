CREATE DATABASE ecommerce;


CREATE TABLE productos (
  id_producto SERIAL PRIMARY KEY,
  nombre VARCHAR(250) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0
);

CREATE TABLE usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(250) NOT NULL,
  email VARCHAR(250) UNIQUE NOT NULL,
  password VARCHAR(250) NOT NULL
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  id_producto INT,
  id_usuario INT,
  total DECIMAL(10, 2) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) 
);

