package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    
}