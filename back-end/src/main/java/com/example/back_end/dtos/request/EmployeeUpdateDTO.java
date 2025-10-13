package com.example.back_end.dtos.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EmployeeUpdateDTO(
    @NotBlank @Size(min = 3, max = 120) String nome,
    @NotNull LocalDate dataNascimento
) {}