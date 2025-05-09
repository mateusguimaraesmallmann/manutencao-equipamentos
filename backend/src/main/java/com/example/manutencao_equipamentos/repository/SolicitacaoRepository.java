package com.example.manutencao_equipamentos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.Enums.EstadoSolicitacaoEnum;
import com.example.manutencao_equipamentos.model.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    List<Solicitacao> findByClienteIdOrderByDataHoraAsc(String clienteId);
    List<Solicitacao> findByEstadoOrderByDataHoraAsc(EstadoSolicitacaoEnum estado);
    
}
