package com.example.back_end.dtos.request;

import jakarta.validation.constraints.NotBlank;

public record  EfetuarManutencaoDTO (
    @NotBlank
    String descricao,

    @NotBlank
    String orientacoes
){}