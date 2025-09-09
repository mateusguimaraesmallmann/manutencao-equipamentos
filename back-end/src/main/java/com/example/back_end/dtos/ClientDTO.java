package com.example.back_end.dtos;

public record ClientDTO(
    Long id,
    String cpf,
    String nome,
    String email,
    String telefone,
    String cep,
    String numero,
    String complemento,
    String cidade,
    String estado
) {}
