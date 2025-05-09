package com.example.manutencao_equipamentos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.model.CategoriaEquipamento;
import com.example.manutencao_equipamentos.repository.CategoriaEquipamentoRepository;

@Service
public class CategoriaEquipamentoService {

    @Autowired
    private CategoriaEquipamentoRepository categoriaEquipamentoRepository;

    public List<CategoriaEquipamento> listar() {
        return categoriaEquipamentoRepository.findAll();
    }

    public CategoriaEquipamento salvar(CategoriaEquipamento cat) {
        return categoriaEquipamentoRepository.save(cat);
    }

    public CategoriaEquipamento atualizar(Long id, CategoriaEquipamento cat) {
        cat.setId(id);
        return categoriaEquipamentoRepository.save(cat);
    }

    public void excluir(Long id) {
        categoriaEquipamentoRepository.deleteById(id);
    }
}