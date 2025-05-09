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
import com.example.manutencao_equipamentos.services.CategoriaEquipamentoService;

@RestController
@RequestMapping("/categorias")
public class CategoriaEquipamentoController {

    @Autowired 
    private CategoriaEquipamentoService categoriaEquipamentoService;

    @GetMapping 
    public List<CategoriaEquipamento> listar() {
        return categoriaEquipamentoService.listar();
    }

    @PostMapping 
    public CategoriaEquipamento salvar(@RequestBody CategoriaEquipamento cat) {
        return categoriaEquipamentoService.salvar(cat);
    }

    @PutMapping("/{id}")
    public CategoriaEquipamento atualizar(@PathVariable Long id, @RequestBody CategoriaEquipamento cat) {
        return categoriaEquipamentoService.atualizar(id, cat);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        categoriaEquipamentoService.excluir(id);
    }
    
}
