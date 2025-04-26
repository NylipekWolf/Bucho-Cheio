CREATE TABLE bucho_cheio.Usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil_id INTEGER REFERENCES bucho_cheio.Perfil(id) ON DELETE CASCADE,
    CONSTRAINT fk_perfil FOREIGN KEY (perfil_id) REFERENCES bucho_cheio.Perfil(id)
);