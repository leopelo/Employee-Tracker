DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    dep_name VARCHAR(30) NOT NULL
    PRIMARY KEY (id)

);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary VARCHAR(30) NOT NULL,
    department_id INT

);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    roles_id INT,
    manager_id INT,
   FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL


);