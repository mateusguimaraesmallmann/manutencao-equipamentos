package com.example.back_end.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CategoriaCreateUpdateDTO(
    @NotBlank @Size(max = 80)
    String nome,

    @NotNull
    Boolean ativo
) {}