package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, String> {
    
}
