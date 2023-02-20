INSERT INTO department (id, name)
VALUES (1, "development"),
       (2, "SEO"),
       (3, "SMM");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Front-end", 1001, 1),
       (2, "Back-end", 1001, 1),
       (3, "SEO-manager", 1002, 2),
       (4, "SMM-manager", 1003, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Bob", "Brown", 1, 1),
       (2, "Jack", "Pink", 2, 2),
       (3, "Anna", "Green", 3, 3),
       (4, "Marta", "Grey", 4, 4);