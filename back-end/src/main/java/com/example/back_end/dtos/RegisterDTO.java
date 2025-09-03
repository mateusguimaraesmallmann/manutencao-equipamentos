package com.example.back_end.dtos;

public record RegisterDTO(
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
