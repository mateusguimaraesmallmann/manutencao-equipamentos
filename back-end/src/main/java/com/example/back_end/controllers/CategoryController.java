package com.example.back_end.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.back_end.models.Category;
import com.example.back_end.services.CategoryService;

public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> listar(){
        return categoryService.findAll();
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Category category){
        Category newCategory = categoryService.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }

    @PutMapping("/{id}")
    public Category atualizar(@PathVariable Long id, @RequestBody Category category){
        return categoryService.atualizar(id, category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> Excluir(@PathVariable Long id){
        categoryService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}