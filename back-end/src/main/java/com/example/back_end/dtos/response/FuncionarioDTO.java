package com.example.back_end.dtos.response;

public record FuncionarioDTO(
    String id,
    String nome,
    String email,
    String dataNascimento,
    Boolean ativo,
    String createdAt,
    String updatedAt
) {}