package com.example.back_end.dtos.response;

public record SolicitacaoDTO(
    Long id,
    String descricaoProduto,
    String defeito,
    String estado,
    String createdAt,
    Long categoriaId
) {}