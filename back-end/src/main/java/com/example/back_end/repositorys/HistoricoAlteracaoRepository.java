package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.HistoricoAlteracao;

public interface HistoricoAlteracaoRepository extends JpaRepository<HistoricoAlteracao, Long> {
    
}
