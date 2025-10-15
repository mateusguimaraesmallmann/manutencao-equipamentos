package com.example.back_end.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SolicitacaoCreateDTO(
    @NotBlank @Size(max = 200)
    String descricaoProduto,

    @Size(max = 500)
    String defeito,

    @NotNull
    Long categoriaId
) {}
