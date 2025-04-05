CREATE TABLE bucho_cheio.Produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco FLOAT NOT NULL,
    categoria bucho_cheio.Categoria NOT NULL,
    descricao VARCHAR(500),
    avisos TEXT[],
    url_imagem BYTEA
);