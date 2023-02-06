CREATE DATABASE pern_todo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    owner VARCHAR(255),
    priority VARCHAR(10),
    day VARCHAR(10),
    Morning boolean,
    Afternoon boolean,
    Evening boolean,
    completed boolean
);

ALTER TABLE todo
ADD COLUMN completed BOOLEAN DEFAULT FALSE;