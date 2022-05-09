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
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL

);


--insert into users  
--bcrypted salt password 10 times
INSERT INTO users (email, password)
VALUES ('user@gmail.com', '$2a$10$0JWukE6tCAkeWNeE2WMN/uklVd3xbihDze0u7.KgV6jM0XmC6vtau');