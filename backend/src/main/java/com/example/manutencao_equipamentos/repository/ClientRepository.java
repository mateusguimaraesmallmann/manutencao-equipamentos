package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.Client;

public interface ClientRepository extends JpaRepository<Client, String> {

    boolean existsByCpf(String cpf);
    boolean existsByLogin(String login);
    
}
