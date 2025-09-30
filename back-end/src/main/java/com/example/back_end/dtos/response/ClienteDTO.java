package com.example.back_end.dtos.response;

public record ClienteDTO(
    String id,
    String nome,
    String cpf,
    String email,
    String telefone,
    EnderecoDTO endereco,
    String createdAt,
    Boolean ativo
) {}