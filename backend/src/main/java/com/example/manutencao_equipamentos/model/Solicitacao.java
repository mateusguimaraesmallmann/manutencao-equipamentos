package com.example.manutencao_equipamentos.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.manutencao_equipamentos.Enums.EstadoSolicitacaoEnum;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "solicitacao")
@Entity(name = "solicitacao")
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private CategoriaEquipamento categoria;

    private String descricaoEquipamento;
    private String defeito;
    private LocalDateTime dataHora;
    private EstadoSolicitacaoEnum estado;

    private BigDecimal valorOrcamento;
    private String descricaoManutencao;
    private String orientacoesCliente;
    private LocalDateTime dataHoraPagamento;

    @ManyToOne
    private Funcionario funcionarioResponsavel;
    
}
