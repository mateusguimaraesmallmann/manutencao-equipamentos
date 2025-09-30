package com.example.back_end.dtos.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EmployeeCreateDTO(
    
    @NotBlank @Size(min = 3, max = 120)
    String nome,

    @NotBlank @Email
    String email,

    @NotBlank
    String senha,

    @NotNull @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate dataNascimento
) {}