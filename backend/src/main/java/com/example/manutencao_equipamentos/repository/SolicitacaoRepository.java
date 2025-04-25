package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    
}
