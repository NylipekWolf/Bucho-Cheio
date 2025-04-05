CREATE SCHEMA bucho_cheio;

CREATE TYPE bucho_cheio.StatusPagamento AS ENUM (
    'Pendente',
    'Pago',
    'Cancelado',
    'Estornado'
);

