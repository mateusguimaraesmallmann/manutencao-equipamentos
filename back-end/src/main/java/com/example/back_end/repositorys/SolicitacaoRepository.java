package com.example.back_end.repositorys;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.enums.EstadoSolicitacao;
import com.example.back_end.models.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    List<Solicitacao> findAllByClienteIdOrderByCreatedAtAsc(Long id);
    List<Solicitacao> findAllByResponsavelAtualIdOrderByCreatedAtAsc(Long id);
    List<Solicitacao> findAllByResponsavelAtualIdAndCreatedAtBetweenOrderByCreatedAtAsc(Long id, LocalDateTime inicio, LocalDateTime fim);
    List<Solicitacao> findAllByEstado(EstadoSolicitacao estado);
    List<Solicitacao> findByEstadoAndOrcamentoValorIsNotNull(EstadoSolicitacao estado);
    List<Solicitacao> findByEstadoAndOrcamentoValorIsNotNullAndFinalizacaoDataBetween(EstadoSolicitacao estado, LocalDateTime inicio, LocalDateTime fim);
    
}