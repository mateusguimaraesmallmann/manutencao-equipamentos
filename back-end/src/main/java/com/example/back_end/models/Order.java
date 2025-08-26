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
@Table(name = "order")
@Entity(name = "order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id")
    @JsonProperty("client")
    private Client client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    @JsonProperty("category")
    private Category category;

    @JsonProperty("equipment_description")
    @Column(name = "descricao_equipamento")
    private String descricaoEquipamento;

    @JsonProperty("deffect_description")
    @Column(name = "defeito")
    private String defeito;

    @JsonProperty("created_at")
    @Column(name = "data_hora")
    private LocalDateTime dataHora;

    @JsonProperty("status")
    @Enumerated(EnumType.STRING)
    private OrderStatus estado;

    @JsonProperty("price")
    @Column(name = "valor_orcamento")
    private BigDecimal valorOrcamento;  
}
