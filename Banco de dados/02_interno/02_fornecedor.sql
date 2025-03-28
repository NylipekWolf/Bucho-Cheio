CREATE TABLE Fornecedor (
    id SERIAL PRIMARY KEY,
    endereco_id INT REFERENCES Endereco(id) ON DELETE SET NULL
);
-- Adicionando chave estrangeira em Fornecedor para Endereco
ALTER TABLE Fornecedor
ADD CONSTRAINT fk_endereco
FOREIGN KEY (endereco_id) REFERENCES Endereco(id);
