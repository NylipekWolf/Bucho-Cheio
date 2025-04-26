CREATE TABLE bucho_cheio.fornecedor_endereco (
    id SERIAL PRIMARY KEY,
    logradouro VARCHAR(255) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(255) NULL
);

CREATE TABLE bucho_cheio.fornecedor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco_id INTEGER NOT NULL REFERENCES bucho_cheio.fornecedor_endereco(id),
    CONSTRAINT fk_endereco_fornecedor FOREIGN KEY(id) REFERENCES bucho_cheio.fornecedor_endereco(id)
);


CREATE TABLE bucho_cheio.fornecedor_contato (
    id SERIAL PRIMARY KEY,
    tipo_contato VARCHAR(100) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    fornecedor_id INT NOT NULL REFERENCES bucho_cheio.fornecedor(id) ON DELETE CASCADE,
    CONSTRAINT fk_contato_fornecedor FOREIGN KEY (fornecedor_id) REFERENCES bucho_cheio.fornecedor(id) ON DELETE CASCADE
);