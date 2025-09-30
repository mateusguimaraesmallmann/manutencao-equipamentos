package com.example.back_end.dtos.response;

import java.util.List;

import com.example.back_end.enums.EstadoSolicitacao;

public record  SolicitacaoDTO (
    String id,
    String createdAt,
    String clienteNome,
    String clienteId,
    ClienteDTO cliente,
    String clienteEmail,
    String descricaoProduto,
    String defeito,
    EstadoSolicitacao estado,
    Double orcamentoValor,
    String categoria,
    String pagaEm,
    String manutencaoDescricao,
    String manutencaoOrientacoes,
    String manutencaoData,
    RedirecionadaParaDTO redirecionadaPara,
    String finalizacaoData,
    List<HistoricoDTO> historico
){}