package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.manutencao_equipamentos.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
