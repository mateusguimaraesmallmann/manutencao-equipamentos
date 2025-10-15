package com.example.back_end.services;

import com.example.back_end.models.Category;
import com.example.back_end.repositorys.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Category atualizar(Long id, Category category) {
        Category c = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada id=" + id));

        c.setNome(category.getNome());
        if (category.getAtivo() != null) {
            c.setAtivo(category.getAtivo());
        }
        return categoryRepository.save(c);
    }

    public void excluir(Long id) {
        var c = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        c.setAtivo(false);
        c.setUpdatedAt(LocalDateTime.now());
        categoryRepository.save(c);
    }
    
}