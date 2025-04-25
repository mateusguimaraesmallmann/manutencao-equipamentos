package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.HistoricoAlteracao;

public interface HistoricoSolicitacaoRepository extends JpaRepository<HistoricoAlteracao, Long> {
    
}
