package com.example.back_end.models;

import java.time.LocalDateTime;

import com.example.back_end.enums.OrderStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "historico_alteracao")
@Entity(name = "historico_alteracao")
public class ChangeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Order order;

    @Enumerated(EnumType.STRING)
    private OrderStatus estadoAnterior;

    @Enumerated(EnumType.STRING)
    private OrderStatus estadoNovo;

    private LocalDateTime dataHora;

    @ManyToOne
    private User autor;
    
}
