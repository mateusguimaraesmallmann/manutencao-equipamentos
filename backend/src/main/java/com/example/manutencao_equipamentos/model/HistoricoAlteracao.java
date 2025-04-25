package com.example.manutencao_equipamentos.model;

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
@Table(name = "historicoAlteracao")
@Entity(name = "historicoAlteracao")
public class HistoricoAlteracao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Solicitacao solicitacao;

    private EstadoSolicitacaoEnum estadoAnterior;
    private EstadoSolicitacaoEnum estadoNovo;
    private LocalDateTime dataHora;

    @ManyToOne
    private Funcionario funcionario;
    
}
