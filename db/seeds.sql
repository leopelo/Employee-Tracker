USE employees_db;

INSERT INTO department (dep_name)
VALUES
  ('Grocery'),
  ('Deli'),
  ('Front End'),
  ('Produce');

-- Inserts roles of employee into role table
INSERT INTO roles (title, salary, department_id)
VALUES
  ('CBC Manager', 35000, 1),
  ('Deli Clerk', 25000, 2),
  ('Center Store Manager', 40000, 1),
  ('Deli Manager', 49000, 2);

-- Inserts employee information into employee table
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
  ('Leonela', 'Ludena', 1, 1),
  ('Joel', 'Nunez', 2, 2),
  ('Ritchard', 'Ohnmacht', 3, 1),
  ('Megan', 'Riley', 4, 2);