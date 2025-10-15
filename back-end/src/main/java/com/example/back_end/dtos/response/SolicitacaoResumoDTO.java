package com.example.back_end.dtos.response;

import com.example.back_end.enums.EstadoSolicitacao;

public record SolicitacaoResumoDTO(
    Long id,
    String createdAt,
    String descricaoProduto,
    EstadoSolicitacao estado
) {}