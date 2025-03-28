CREATE TABLE Endereco (
    id SERIAL PRIMARY KEY,
    logradouro VARCHAR(255) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    numero INT,
    complemento VARCHAR(255)
);