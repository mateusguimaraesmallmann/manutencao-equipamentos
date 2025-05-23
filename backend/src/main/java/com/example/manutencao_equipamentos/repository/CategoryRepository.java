package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
