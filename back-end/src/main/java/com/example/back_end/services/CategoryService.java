package com.example.back_end.services;

import com.example.back_end.models.Category;
import com.example.back_end.repositorys.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);

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
        if(!categoryRepository.existsById(id)) {
            throw new RuntimeException("Categoria não econtrada com a id:" + id);
        }

        Category managed = categoryRepository.findById(id).get();
        managed.setNome(category.getNome());

        categoryRepository.save(managed);
        return managed;
    }

    public void excluir(Long id) {
        log.info("Excluindo categoria id={}", id);
        try {
            categoryRepository.deleteById(id);
        } catch (Exception ex) {
            throw new RuntimeException("Erro ao excluir a categoria de id: " + id);
        }
    }

}