package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
}