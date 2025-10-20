package com.example.back_end.dtos.response;

import com.example.back_end.enums.EstadoSolicitacao;

public record  SolicitacaoFuncionarioResumoDTO (
    Long id,
    String createdAt,
    String clienteNome,
    String descricaoProduto,
    EstadoSolicitacao estado
) {}