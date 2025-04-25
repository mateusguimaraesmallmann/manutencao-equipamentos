package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, String> {

    boolean existsByCpf(String cpf);
    boolean existsByLogin(String login);
    
}
