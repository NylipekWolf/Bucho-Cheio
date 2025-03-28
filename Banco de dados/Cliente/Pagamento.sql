CREATE TABLE Pagamento (
    id SERIAL PRIMARY KEY,
    id_comanda INT, -- Será referenciado após a criação da tabela Comanda
    valor_pago FLOAT NOT NULL,
    metodo_pagamento MetodoPagamento NOT NULL,
    data_pagamento DATE NOT NULL,
    status StatusPagamento NOT NULL
);
ALTER TABLE Pagamento
ADD CONSTRAINT fk_comanda
FOREIGN KEY (id_comanda) REFERENCES Comanda(id);
