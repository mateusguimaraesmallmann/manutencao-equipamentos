package com.example.manutencao_equipamentos.dto;

import java.time.LocalDate;

public record EmployeeCreateDTO(
    String name,
    String email,
    String password,
    LocalDate birthdate
) {}