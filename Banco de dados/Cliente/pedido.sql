CREATE TABLE Pedido (
    id SERIAL PRIMARY KEY,
    id_produto INT REFERENCES Produto(id) ON DELETE CASCADE,
    id_comanda INT, -- Será referenciado após a criação da tabela Comanda
    status StatusPedido NOT NULL,
    data_hora TIMESTAMP NOT NULL
);
ALTER TABLE Pedido
ADD CONSTRAINT fk_comanda
FOREIGN KEY (id_comanda) REFERENCES Comanda(id);
