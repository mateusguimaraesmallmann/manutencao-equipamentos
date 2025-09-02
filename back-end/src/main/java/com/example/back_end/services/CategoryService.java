package com.example.back_end.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back_end.models.Category;
import com.example.back_end.repositorys.CategoryRepository;

@Service
public class CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll(){
        return categoryRepository.findAll();
    }

    public Category save(Category category){
        return categoryRepository.save(category);
    }

    public Category atualizar(Long id, Category category) {
        if(!categoryRepository.existsById(id)){
            throw new RuntimeException("Categoria não econtrada com a id:" + id);
        }
        category.setId(id);
        return categoryRepository.save(category);
    }

    public void excluir(Long id){
        if(!categoryRepository.existsById(id)){
            throw new RuntimeException("Categoria não econtrada com a id:" + id);
        }
        categoryRepository.deleteById(id);
    }
}