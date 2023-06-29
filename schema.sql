DROP DATABASE IF EXISTS positions_db;
CREATE DATABASE positions_db;

USE positions_db;

CREATE TABLE departments (
  department_id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30)
);

CREATE TABLE roles (
  role_id INT PRIMARY KEY AUTO_INCREMENT,
  role_title VARCHAR(30),
  role_salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE employees (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);
