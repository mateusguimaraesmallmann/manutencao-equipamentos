package com.example.back_end.dtos.response;

public record EnderecoDTO(
    String cep,
    String rua,
    String numero,
    String bairro,
    String cidade,
    String estado,
    String complemento
) {}