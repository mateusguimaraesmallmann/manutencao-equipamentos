package com.example.back_end.dtos.response;

import java.math.BigDecimal;
import java.util.List;

import com.example.back_end.enums.EstadoSolicitacao;

public record SolicitacaoClienteDetalheDTO(
    Long id,
    String createdAt,
    String clienteNome,
    String clienteEmail,
    String descricaoProduto,
    String defeito,
    String manutencaoDescricao,
    String manutencaoOrientacoes,
    EstadoSolicitacao estado,
    BigDecimal orcamentoValor,
    List<HistoricoDTO> historico
) {}