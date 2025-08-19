package com.example.back_end.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    public Order criarSolicitacao(Order order) {
        // to be implemented
        return null;
    }

    public Order buscarDetalhada(Long id) {
        // to be implemented
        return null;
    }

    public void aprovar(Long id, User user) {
        // to be implemented
    }

    public void rejeitar(Long id, String motivo, User user) {
        // to be implemented
    }

    public void resgatar(Long id, User user) {
        // to be implemented
    }

    public void pagar(Long id, User user) {
        // to be implemented
    }

    private void registrarHistorico(Order order, OrderStatus anterior, OrderStatus novo, User user) {
        // to be implemented
    }
    
}