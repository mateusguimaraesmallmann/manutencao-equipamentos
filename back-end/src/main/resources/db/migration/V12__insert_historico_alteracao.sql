INSERT INTO solicitachistorico_alteracaoao (solicitacao_id, estado_anterior, estado_novo, data_hora, autor_id, destino_id) VALUES 
(       TIMESTAMP '2025-10-21 10:47:17.87812', 3, 4, 'Notebook', 'Não liga', 'ABERTA');




/*manutencao_equipamentos=# Select * from historico_alteracao;
 id | solicitacao_id | estado_anterior | estado_novo |         data_hora          | autor_id | destino_id
----+----------------+-----------------+-------------+----------------------------+----------+------------
  1 |             10 |                 | ABERTA      | 2025-11-10 17:08:56.677927 |          |
  2 |             11 |                 | ABERTA      | 2025-11-10 17:09:03.541269 |          |
  3 |             10 | ABERTA          | ORCADA      | 2025-11-10 17:09:35.598097 |        1 |
  4 |             11 | ABERTA          | ORCADA      | 2025-11-10 17:09:40.37201  |        1 |
  5 |             10 | ORCADA          | APROVADA    | 2025-11-10 17:09:47.540746 |        3 |
  6 |             11 | ORCADA          | APROVADA    | 2025-11-10 17:09:48.988848 |        3 |*/