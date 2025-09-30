package com.example.back_end.dtos.response;

import com.example.back_end.enums.EstadoSolicitacao;

public record HistoricoDTO(
    String quando,
    EstadoSolicitacao de,
    EstadoSolicitacao para,
    String funcionario
) {}