CREATE TABLE Mesa (
    id SERIAL PRIMARY KEY,
    numero_da_mesa INT NOT NULL,
    quantidade_de_lugares INT NOT NULL,
    status StatusMesa NOT NULL
);