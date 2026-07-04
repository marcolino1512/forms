-- Rode este script uma vez no seu MySQL para criar o banco e a tabela de usuarios.
-- Ajuste o nome do banco caso queira usar um diferente do valor DB_NAME no .env

CREATE DATABASE IF NOT EXISTS html_teste_login
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE html_teste_login;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
