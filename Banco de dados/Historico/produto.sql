CREATE TABLE HistoricoProduto (
    id SERIAL PRIMARY KEY,
    id_produto INT REFERENCES Produto(id) ON DELETE CASCADE,
    acao VARCHAR(10) NOT NULL CHECK (acao IN ('CREATE', 'UPDATE', 'DELETE')),
    dados_antigos TEXT,
    dados_novos TEXT,
    id_usuario INT REFERENCES Usuario(id) ON DELETE CASCADE,
    data_alteracao TIMESTAMP NOT NULL
);