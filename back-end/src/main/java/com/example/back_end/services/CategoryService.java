package com.example.back_end.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService{

    @AutoWired
    private CategoryService categoryService;

    public List<Category> findAll(){
        return categoryService.findAll();
    }

    public Category save(Category category){
        return categoryRepository.save(category);
    }

    public Category atualziar(Long id, Category category){
        if(!categoryRepository.existById(id)){
            throw new RunTimeException("Categoria não econtrada com a id:" + id);
        }
        category.setId(id);
        return categoryRepository.save(category);
    }

    public void excluir(Long id){
        if(!categoryRepository.existById(id)){
            throw new RunTimeException("Categoria não econtrada com a id:" + id);
        }
        categoryRepository.deleteById(id);
    }
}