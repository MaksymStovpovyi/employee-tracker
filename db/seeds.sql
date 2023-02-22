INSERT INTO department (name)
VALUES ("development"),
       ("SEO"),
       ("SMM");

INSERT INTO role (title, salary, department_id)
VALUES ("Front-end", 1001, 1),
       ("Back-end", 1001, 1),
       ("SEO-manager", 1002, 2),
       ("SMM-manager", 1003, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Brown", 1, 1),
       ("Jack", "Pink", 2, 2),
       ("Anna", "Green", 3, 3),
       ("Marta", "Grey", 4, 4);