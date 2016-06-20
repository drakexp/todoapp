DROP DATABASE IF EXISTS todoapp;
CREATE DATABASE todoapp;

\c todoapp;

CREATE TABLE todo (
id serial PRIMARY KEY,
description text NOT NULL,
status boolean NOT NULL
);