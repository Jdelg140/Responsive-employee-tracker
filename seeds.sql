USE positions_db;
INSERT INTO departments (department_name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO roles (role_title, role_salary, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 100000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);

INSERT INTO employees (first_name, last_name, department_name, role_title, manager_id, role_salary)
VALUES 
('Mark', 'Miller',"IT", 'Full Stack Developer', NULL,80000),
('Mary','Brown',"IT",'Software Engineer', 1,120000),
('Ashley', 'Jones','Finance & Accounting', 'Accountant', 3,100000),
('Devin', 'Anderson','Finance & Accounting','Financial Analyst', NULL,150000),
('Ana', 'Sanchez','Sales & Marketing','Marketing Coordinator', 5,70000),
('Tyler', 'Moore', 'Sales & Marketing','Sales Lead', NULL,90000),
('Lewis', 'Allen','Operations','Project Manager', NULL,100000),
('Katherine', 'Green','Operations','Operations Manager', 7,90000);