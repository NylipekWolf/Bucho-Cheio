CREATE TABLE bucho_cheio.HistoricoProduto (
    id SERIAL PRIMARY KEY,
    id_produto INTEGER REFERENCES bucho_cheio.Produto(id) ON DELETE CASCADE,
    acao VARCHAR(10) NOT NULL CHECK (acao IN ('CREATE', 'UPDATE', 'DELETE')),
    dados_antigos TEXT,
    dados_novos TEXT,
    id_usuario INTEGER REFERENCES bucho_cheio.Usuario(id) ON DELETE CASCADE,
    data_alteracao TIMESTAMP NOT NULL
);