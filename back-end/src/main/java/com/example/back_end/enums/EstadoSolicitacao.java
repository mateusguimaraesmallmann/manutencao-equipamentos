package com.example.back_end.enums;

public enum EstadoSolicitacao {
    ABERTA("ABERTA"),
    ORCADA("ORÇADA"),
    REJEITADA("REJEITADA"),
    APROVADA("APROVADA"),
    REDIRECIONADA("REDIRECIONADA"),
    ARRUMADA("ARRUMADA"),
    PAGA("PAGA"),
    FINALIZADA("FINALIZADA");

    private String descricao;

    EstadoSolicitacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}