INSERT INTO solicitacao (created_at, cliente_id, categoria_id, descricao_produto, defeito, estado) VALUES 
(TIMESTAMP '2025-10-21 10:47:17.87812', 3, 4, 'Notebook', 'Não liga', 'ABERTA'),
(TIMESTAMP '2025-10-21 18:58:17.87812', 3, 4, 'Notebook', 'Tela trincada', 'ABERTA'),
(TIMESTAMP '2025-10-20 12:47:17.87812', 3, 4, 'Notebook', 'Touchpad não funciona', 'ABERTA'),
(TIMESTAMP '2025-10-20 08:20:17.87812', 4, 2, 'Impressora HP', 'Não liga', 'ABERTA'),
(TIMESTAMP '2025-10-19 17:43:17.87812', 4, 3, 'Mouse Logitech', 'Quebrou botão do lado esquerdo', 'ABERTA'),
(TIMESTAMP '2025-10-19 09:00:17.87812', 5, 4, 'Notebook Dell', 'Tela azul', 'ABERTA'),
(TIMESTAMP '2025-10-18 15:39:17.87812', 5, 5, 'Teclado gamer', 'Precisa pressionar muito forte as teclas', 'ABERTA'),
(TIMESTAMP '2025-10-18 20:35:17.87812', 6, 5, 'Teclado', 'Teclado númerico não funciona', 'ABERTA'),
(TIMESTAMP '2025-10-18 22:56:17.87812', 6, 1, 'Desktop gamer', 'Não liga', 'ABERTA');

INSERT INTO solicitacao (created_at, cliente_id, categoria_id, descricao_produto, defeito, estado, valor_orcamento, responsavel_atual_id) VALUES 
(TIMESTAMP '2025-11-10 22:56:17.87812', 3, 1, 'Teste filtros 1', 'Não liga', 'APROVADA', 10.00, 1),
(TIMESTAMP '2025-11-10 22:56:17.87812', 3, 1, 'Teste filtros 2', 'Não liga', 'APROVADA', 10.00, 1),
(TIMESTAMP '2025-11-10 22:56:17.87812', 3, 1, 'Teste filtros 3', 'Não liga', 'APROVADA', 10.00, 1),
(TIMESTAMP '2025-11-05 22:56:17.87812', 3, 1, 'Teste filtros 4', 'Não liga', 'APROVADA', 10.00, 1),
(TIMESTAMP '2025-11-06 22:56:17.87812', 3, 1, 'Teste filtros 5', 'Não liga', 'APROVADA', 10.00, 1),
(TIMESTAMP '2025-11-07 22:56:17.87812', 3, 1, 'Teste filtros 6', 'Não liga', 'APROVADA', 10.00, 1);