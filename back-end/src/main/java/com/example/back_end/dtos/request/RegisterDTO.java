package com.example.back_end.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
    @NotBlank @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dígitos numéricos.")
    String cpf,

    @NotBlank @Size(min = 3, max = 120)
    String nome,

    @NotBlank @Email
    String email,

    @NotBlank @Pattern(regexp = "\\d{10,11}", message = "Telefone deve conter 10 ou 11 dígitos numéricos.")
    String telefone,

    @NotBlank @Pattern(regexp = "\\d{8}", message = "CEP deve conter 8 dígitos numéricos.")
    String cep,

    @NotBlank @Size(max = 120)
    String rua,

    @NotBlank @Size(max = 80)
    String bairro,

    @NotBlank @Size(max = 10)
    String numero,

    @Size(max = 120)
    String complemento,

    @NotBlank @Size(max = 80)
    String cidade,

    @NotBlank @Pattern(regexp = "[A-Z]{2}", message = "Estado deve ser a UF com 2 letras maiúsculas.")
    String estado
) {}