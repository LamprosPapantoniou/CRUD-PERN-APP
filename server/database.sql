CREATE DATABASE company;

CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(19),
    lastName VARCHAR(25),
    birthDate DATE,
    afm VARCHAR(9)
);
