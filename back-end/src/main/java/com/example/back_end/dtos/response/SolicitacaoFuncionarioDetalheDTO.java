package com.example.back_end.dtos.response;

import java.math.BigDecimal;
import java.util.List;

import com.example.back_end.enums.EstadoSolicitacao;

public record  SolicitacaoFuncionarioDetalheDTO (
    Long id,
    String createdAt,
    String descricaoProduto,
    String defeito,
    EstadoSolicitacao estado,
    BigDecimal orcamentoValor,
    ClienteDTO cliente,
    List<HistoricoDTO> historico
) {}
