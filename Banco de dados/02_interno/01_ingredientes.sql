CREATE TABLE Ingrediente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    vencimento DATE,
    fornecedor VARCHAR(255),
    preco FLOAT NOT NULL
);