CREATE TABLE bucho_cheio.Pagamento (
    id SERIAL PRIMARY KEY,
    id_comanda INTEGER NOT NULL REFERENCES bucho_cheio.Comanda(id) ON DELETE CASCADE, 
    valor_pago FLOAT NOT NULL,
    metodo_pagamento bucho_cheio.MetodoPagamento NOT NULL,
    data_pagamento TIMESTAMP NOT NULL,
    status bucho_cheio.StatusPagamento NOT NULL,
    CONSTRAINT fk_comanda FOREIGN KEY (id_comanda) REFERENCES bucho_cheio.Comanda(id)
);