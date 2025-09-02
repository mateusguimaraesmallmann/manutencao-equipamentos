package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByLogin(String email);
    
}
