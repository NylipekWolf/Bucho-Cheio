CREATE TABLE bucho_cheio.Perfil (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    permissoes bucho_cheio.Permissao[]
);
