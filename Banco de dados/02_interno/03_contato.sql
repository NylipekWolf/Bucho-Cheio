CREATE TABLE Contato (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255),
    tipo TipoContato NOT NULL,
    fornecedor_id INT REFERENCES Fornecedor(id) ON DELETE CASCADE
);