package com.example.back_end.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.back_end.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name = "orders")
@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonProperty("client")
    private User client;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    @JsonProperty("category")
    private Category category;

    @JsonProperty("equipment_description")
    @Column(name = "descricao_equipamento", nullable = false)
    private String descricaoEquipamento;

    @JsonProperty("deffect_description")
    @Column(name = "defeito", nullable = false)
    private String defeito;

    @JsonProperty("created_at")
    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @JsonProperty("status")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private OrderStatus estado;

    @JsonProperty("price")
    @Column(name = "valor_orcamento", precision = 14, scale = 2)
    private BigDecimal valorOrcamento;

}