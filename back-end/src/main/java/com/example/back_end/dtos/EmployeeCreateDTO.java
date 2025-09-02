package com.example.back_end.dtos;

import java.time.LocalDate;

public record EmployeeCreateDTO(
    String name,
    String email,
    String password,
    LocalDate birthdate
) {}