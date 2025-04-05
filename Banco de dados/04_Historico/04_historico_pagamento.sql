CREATE TABLE bucho_cheio.HistoricoPagamento (
    id SERIAL PRIMARY KEY,
    id_pagamento INTEGER REFERENCES Pagamento(id) ON DELETE CASCADE,
    acao VARCHAR(10) NOT NULL CHECK (acao IN ('CREATE', 'UPDATE', 'DELETE')),
    dados_antigos TEXT,
    dados_novos TEXT,
    id_usuario INTEGER REFERENCES Usuario(id) ON DELETE CASCADE,
    data_alteracao TIMESTAMP NOT NULL
);