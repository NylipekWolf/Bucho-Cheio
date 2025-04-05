CREATE TABLE bucho_cheio.Usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil_id INTEGER REFERENCES Perfil(id) ON DELETE CASCADE
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id);
);