CREATE DATABASE pern_todo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    owner VARCHAR(255),
    priority VARCHAR(10),
    day VARCHAR(10),
    morning boolean,
    afternoon boolean,
    evening boolean,
    duration VARCHAR(40),
    completed boolean
);

ALTER TABLE todo
ADD COLUMN completed BOOLEAN DEFAULT FALSE;