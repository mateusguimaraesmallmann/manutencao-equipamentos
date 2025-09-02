package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsById(Long id);
    
}