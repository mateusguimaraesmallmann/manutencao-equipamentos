package com.example.back_end.dtos;

import java.time.LocalDate;

public record EmployeeDTO(
    Long id,
    String name,
    String email,
    LocalDate birthday
) {}
