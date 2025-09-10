package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.EmployeeProfile;

public interface EmployeeRepository extends JpaRepository<EmployeeProfile, Long> {
    
}