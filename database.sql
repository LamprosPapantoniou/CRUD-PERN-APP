CREATE DATABASE company;

CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(19),
    lastName VARCHAR(25),
    birthDate DATE,
    afm VARCHAR(9) UNIQUE
);


CREATE DATABASE jwtauth;

--set extention for uuid generate
CREATE TABLE users(
  id SERIAL PRIMARY KEY ,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL

);


--insert into users 
INSERT INTO users (email, password)
VALUES ('user1@gmail.com', '123456789');