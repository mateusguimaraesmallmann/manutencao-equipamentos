package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByLogin(String email);
    
}
