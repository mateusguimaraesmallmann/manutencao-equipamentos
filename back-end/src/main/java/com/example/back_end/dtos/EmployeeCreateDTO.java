package com.example.back_end.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EmployeeCreateDTO(
    
    @NotBlank
    @Size(min = 3, max = 120)
    String name,

    @NotBlank
    @Email
    String email,

    @NotBlank
    String password,

    @NotBlank
    LocalDate birthdate
) {}