INSERT INTO users (nome, email, password, role, ativo, created_at, updated_at) VALUES 
('Maria', 'maria.funcionario@exemplo.com', '$2a$10$AKTVYkxAtloNQ/qru/3V1OJOxD3ohMj.BscToKt.aZu7i3MGbB/yO', 'FUNCIONARIO', TRUE, NOW(), NOW()), -- funcionario
('Mario', 'mario.funcionario@exemplo.com', '$2a$10$AKTVYkxAtloNQ/qru/3V1OJOxD3ohMj.BscToKt.aZu7i3MGbB/yO' , 'FUNCIONARIO', TRUE, NOW(), NOW()), -- funcionario
('Joao', 'joao.cliente@exemplo.com', '$2a$10$AKTVYkxAtloNQ/qru/3V1OJOxD3ohMj.BscToKt.aZu7i3MGbB/yO' , 'CLIENTE', TRUE, NOW(), NOW()), -- cliente
('Jose', 'jose.cliente@exemplo.com', '$2a$10$AKTVYkxAtloNQ/qru/3V1OJOxD3ohMj.BscToKt.aZu7i3MGbB/yO' , 'CLIENTE', TRUE, NOW(), NOW()), -- cliente
('Joana', 'joana.cliente@exemplo.com', '$2a$10$AKTVYkxAtloNQ/qru/3V1OJOxD3ohMj.BscToKt.aZu7i3MGbB/yO' , 'CLIENTE', TRUE, NOW(), NOW()), -- cliente
('Joaquina', 'joaquina.cliente@exemplo.com', '$2a$10$AKTVYkxAtloNQ/qru/3V1OJOxD3ohMj.BscToKt.aZu7i3MGbB/yO' , 'CLIENTE', TRUE, NOW(), NOW()); -- cliente