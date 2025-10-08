package com.example.back_end.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.back_end.enums.EstadoSolicitacao;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Solicitacao {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonIgnore
    private User cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    @JsonIgnore
    private Category categoria;

    @Column(name = "descricao_produto", nullable = false, length = 200)
    private String descricaoProduto;

    @Column(name = "defeito", length = 500)
    private String defeito;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 30)
    private EstadoSolicitacao estado;

    @Column(name = "valor_orcamento", precision = 14, scale = 2)
    private BigDecimal orcamentoValor;

    @Column(name = "paga_em")
    private LocalDateTime pagaEm;

    @Column(name = "manutencao_descricao", length = 500)
    private String manutencaoDescricao;

    @Column(name = "manutencao_orientacoes", length = 500)
    private String manutencaoOrientacoes;

    @Column(name = "manutencao_data")
    private LocalDate manutencaoData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "redirecionada_para_id")
    @JsonIgnore
    private User redirecionadaPara;

    @Column(name = "finalizacao_data")
    private LocalDateTime finalizacaoData;

    @OneToMany(mappedBy = "solicitacao", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("dataHora ASC")
    private List<HistoricoAlteracao> historico = new ArrayList<>();

    public void addHistorico(HistoricoAlteracao h) {
        h.setSolicitacao(this);
        historico.add(h);
    }

    public void removeHistorico(HistoricoAlteracao h) {
        historico.remove(h);
        h.setSolicitacao(null);
    }

}