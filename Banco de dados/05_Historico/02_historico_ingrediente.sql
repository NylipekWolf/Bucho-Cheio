CREATE TABLE bucho_cheio.HistoricoIngrediente (
    id SERIAL PRIMARY KEY,
    id_ingrediente INTEGER REFERENCES bucho_cheio.Ingrediente(id) ON DELETE CASCADE,
    acao VARCHAR(10) NOT NULL CHECK (acao IN ('CREATE', 'UPDATE', 'DELETE')),
    dados_antigos TEXT,
    dados_novos TEXT,
    id_usuario INTEGER REFERENCES bucho_cheio.Usuario(id) ON DELETE CASCADE,
    data_alteracao TIMESTAMP NOT NULL
);