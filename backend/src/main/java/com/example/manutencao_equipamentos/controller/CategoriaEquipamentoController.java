package com.example.manutencao_equipamentos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.manutencao_equipamentos.model.CategoriaEquipamento;
import com.example.manutencao_equipamentos.repository.CategoriaEquipamentoRepository;

@RestController
@RequestMapping("/categorias")
public class CategoriaEquipamentoController {

    @Autowired 
    private CategoriaEquipamentoRepository categoriaEquipamentoRepository;

    @GetMapping 
    public List<CategoriaEquipamento> listar() {
        return categoriaEquipamentoRepository.findAll();
    }

    @PostMapping 
    public CategoriaEquipamento salvar(@RequestBody CategoriaEquipamento cat) {
        return categoriaEquipamentoRepository.save(cat);
    }

    @PutMapping("/{id}")
    public CategoriaEquipamento atualizar(@PathVariable Long id, @RequestBody CategoriaEquipamento cat) {
        cat.setId(id);
        return categoriaEquipamentoRepository.save(cat);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        categoriaEquipamentoRepository.deleteById(id);
    }
    
}
