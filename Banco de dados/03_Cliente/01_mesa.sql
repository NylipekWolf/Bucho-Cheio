CREATE TABLE bucho_cheio.Mesa (
    id SERIAL PRIMARY KEY,
    numero_da_mesa INTEGER NOT NULL,
    quantidade_de_lugares INTEGER NOT NULL,
    status bucho_cheio.StatusMesa NOT NULL
);