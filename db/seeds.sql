INSERT INTO departments (id, name)
VALUES (1, "Engineering"),
       (2, "Sales"),
       (3, "Service");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Mechanical Engineer", 60000, 1),
    (2, "Salesman", 50000, 2),
    (3, "Technician", 40000, 3),
    (4, "Manager", 100000, 1),
    (5, "Developer", 70000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (123, "first1", "last1", 1, 234),
(234, "first2", "last2", 4, NULL),
(345, "first3", "last3", 2, NULL),
(456, "first4", "last4", 3, 234),
(567, "first5", "last5", 5, 234);