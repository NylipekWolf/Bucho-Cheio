CREATE TABLE bucho_cheio.Ingrediente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL,
    vencimento DATE,
    fornecedor VARCHAR(255),
    preco FLOAT NOT NULL
);