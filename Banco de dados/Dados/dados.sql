INSERT INTO Endereco (logradouro, cep, numero, complemento)
VALUES ('Rua das Flores', '12345-678', 100, 'Sala 101');

-- Inserir um fornecedor
INSERT INTO Fornecedor (endereco_id)
VALUES (1); -- Assumindo que o endereço inserido tem id = 1

-- Inserir contatos para o fornecedor
INSERT INTO Contato (nome, telefone, email, tipo, fornecedor_id)
VALUES 
    ('João Silva', '11987654321', 'joao.silva@example.com', 'Telefone', 1),
    ('Maria Oliveira', 'maria.oliveira@example.com', NULL, 'Email', 1);