CREATE TABLE bucho_cheio.Comanda (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    preco FLOAT NOT NULL,
    status bucho_cheio.StatusComanda NOT NULL,
    id_mesa INTEGER NULL REFERENCES Mesa(id) ON DELETE CASCADE,
    id_usuario INTEGER NOT NULL
);