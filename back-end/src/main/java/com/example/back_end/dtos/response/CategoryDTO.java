package com.example.back_end.dtos.response;

public record CategoryDTO (
    String id,
    String nome,
    Boolean ativo,
    String createdAt,
    String updatedAt
) {}
