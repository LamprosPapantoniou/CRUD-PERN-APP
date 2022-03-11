CREATE DATABASE company;

CREATE TABLE employees(
    em_id SERIAL PRIMARY KEY,
    first_name VARCHAR(19),
    last_name VARCHAR(25),
    birth_date DATE,
    afm VARCHAR(9)
);
