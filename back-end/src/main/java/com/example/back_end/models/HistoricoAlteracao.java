package com.example.back_end.models;

import java.time.LocalDateTime;

import com.example.back_end.enums.EstadoSolicitacao;

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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter 
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "historico_alteracao")
@Entity
public class HistoricoAlteracao {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitacao_id", nullable = false)
    private Solicitacao solicitacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_anterior", nullable = true, length = 30)
    private EstadoSolicitacao estadoAnterior;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_novo", nullable = false, length = 30)
    private EstadoSolicitacao estadoNovo;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id", nullable = false)
    private User autor;
    
}