CREATE TABLE bucho_cheio.HistoricoMesa (
    id SERIAL PRIMARY KEY,
    id_mesa INTEGER REFERENCES Mesa(id) ON DELETE CASCADE,
    acao VARCHAR(10) NOT NULL CHECK (acao IN ('CREATE', 'UPDATE', 'DELETE')),
    dados_antigos TEXT,
    dados_novos TEXT,
    id_usuario INTEGER REFERENCES Usuario(id) ON DELETE CASCADE,
    data_alteracao TIMESTAMP NOT NULL
);