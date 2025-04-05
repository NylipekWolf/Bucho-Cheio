CREATE TABLE bucho_cheio.Pedido (
    id SERIAL PRIMARY KEY,
    id_produto INTEGER NOT NULL REFERENCES bucho_cheio.Produto(id) ON DELETE CASCADE,
    id_comanda INTEGER NOT NULL REFERENCES bucho_cheio.Comanda(id) ON DELETE CASCADE,
    status bucho_cheio.StatusPedido NOT NULL,
    data_hora TIMESTAMP NOT NULL
    CONSTRAINT fk_comanda FOREIGN KEY (id_comanda) REFERENCES bucho_cheio.Comanda(id);
    CONSTRAINT fk_comanda FOREIGN KEY (id_comanda) REFERENCES bucho_cheio.Comanda(id);
);