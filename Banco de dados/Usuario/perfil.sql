CREATE TABLE Perfil (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    permissoes Permissao[]
);
