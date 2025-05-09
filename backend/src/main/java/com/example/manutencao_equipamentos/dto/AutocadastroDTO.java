package com.example.manutencao_equipamentos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

public record AutocadastroDTO(
    @NotBlank String cpf,
    @NotBlank String nome,
    @Email String email,
    @NotBlank String telefone,
    @NotBlank String cep,
    @NotBlank String numero,
    String complemento
) {}
