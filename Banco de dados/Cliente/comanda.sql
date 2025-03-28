CREATE TABLE Comanda (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    preco FLOAT NOT NULL,
    status StatusComanda NOT NULL,
    id_mesa INT REFERENCES Mesa(id) ON DELETE CASCADE,
    id_usuario INT -- Será referenciado após a criação da tabela Usuario
);