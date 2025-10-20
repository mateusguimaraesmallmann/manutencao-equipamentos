package com.example.back_end.dtos.response;

import java.math.BigDecimal;
import java.util.List;

import com.example.back_end.enums.EstadoSolicitacao;

public record SolicitacaoDetalheDTO(
    Long id,
    String createdAt,              // ISO para o Angular formatar
    String clienteNome,
    String clienteEmail,
    String descricaoProduto,
    String defeito,
    EstadoSolicitacao estado,
    BigDecimal orcamentoValor,
    List<HistoricoDTO> historico
) {}