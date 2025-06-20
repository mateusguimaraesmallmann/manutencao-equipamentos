package com.example.manutencao_equipamentos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.ChangeHistory;

public interface ChangeHistoryRepository extends JpaRepository<ChangeHistory, Long> {

    List<ChangeHistory> findBySolicitacaoIdOrderByDataHoraDesc(Long solicitacaoId);
    
}
