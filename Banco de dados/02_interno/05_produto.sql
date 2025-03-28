CREATE TABLE Produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco FLOAT NOT NULL,
    categoria Categoria NOT NULL,
    descricao TEXT,
    avisos TEXT[],
    url_imagem VARCHAR(255)
);