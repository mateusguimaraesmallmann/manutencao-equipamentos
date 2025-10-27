package com.example.back_end.dtos.request;

import jakarta.validation.constraints.NotNull;

public record RedirecionarDTO (
    @NotNull
    Long funcionarioDestinoId
){}