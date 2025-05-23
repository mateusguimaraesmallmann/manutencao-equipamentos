package com.example.manutencao_equipamentos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.model.Category;
import com.example.manutencao_equipamentos.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Category atualizar(Long id, Category category) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Categoria não encontrada com id: " + id);
        }
        category.setId(id);
        return categoryRepository.save(category);
    }

    public void excluir(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Categoria não encontrada para exclusão com id: " + id);
        }
        categoryRepository.deleteById(id);
    }
    
}