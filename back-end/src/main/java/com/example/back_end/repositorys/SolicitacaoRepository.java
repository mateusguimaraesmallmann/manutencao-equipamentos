package com.example.back_end.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.enums.EstadoSolicitacao;
import com.example.back_end.models.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    List<Solicitacao> findAllByClienteIdOrderByCreatedAtAsc(Long id);
    List<Solicitacao> findAllByEstado(EstadoSolicitacao estado);
    
}