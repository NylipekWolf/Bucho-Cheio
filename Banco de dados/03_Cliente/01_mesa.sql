CREATE TABLE bucho_cheio.Mesa (
    id SERIAL PRIMARY KEY,
    quantidade_de_lugares INTEGER NOT NULL,
    status bucho_cheio.StatusMesa NOT NULL
);