package com.example.back_end.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
    
    @NotBlank
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dígitos numéricos.")
    String cpf,

    @NotBlank
    @Size(min = 3, max = 120)
    String nome,

    @NotBlank
    @Email
    String email,

    @NotBlank
    @Pattern(regexp = "\\d{10,11}", message = "Telefone deve conter 10 ou 11 dígitos numéricos.")
    String telefone,

    @NotBlank
    @Pattern(regexp = "\\d{8}", message = "CEP deve conter 8 dígitos numéricos.")
    String cep,

    @NotBlank
    @Size(max = 10)
    String numero,

    @Size(max = 120)
    String complemento,

    @NotBlank
    @Size(max = 120)
    String cidade,

    @NotBlank
    @Size(min = 2, max = 2, message = "Estado deve ser a UF com 2 letras.")
    String estado
) {}