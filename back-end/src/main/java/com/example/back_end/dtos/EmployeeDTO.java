package com.example.back_end.dtos;

public record EmployeeDTO(
    Long id,
    String name,
    String email,
    String birthday
) {}
