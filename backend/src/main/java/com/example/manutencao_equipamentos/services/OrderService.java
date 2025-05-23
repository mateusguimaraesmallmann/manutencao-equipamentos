package com.example.manutencao_equipamentos.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.Enums.OrderStatus;
import com.example.manutencao_equipamentos.model.ChangeHistory;
import com.example.manutencao_equipamentos.model.Order;
import com.example.manutencao_equipamentos.model.User;
import com.example.manutencao_equipamentos.repository.ChangeHistoryRepository;
import com.example.manutencao_equipamentos.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ChangeHistoryRepository changeHistoryRepository;

    public Order criarSolicitacao(Order order) {
        order.setEstado(OrderStatus.ABERTA);
        order.setDataHora(LocalDateTime.now());
        Order nova = orderRepository.save(order);
        registrarHistorico(nova, null, OrderStatus.ABERTA, null);
        return nova;
    }

    public Order buscarDetalhada(Long id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
    }

    public void aprovar(Long id, User user) {
        Order order = buscarDetalhada(id);
        OrderStatus anterior = order.getEstado();
        order.setEstado(OrderStatus.APROVADA);
        orderRepository.save(order);
        registrarHistorico(order, anterior, OrderStatus.APROVADA, user);
    }

    public void rejeitar(Long id, String motivo, User user) {
        Order order = buscarDetalhada(id);
        OrderStatus anterior = order.getEstado();
        order.setEstado(OrderStatus.REJEITADA);
        orderRepository.save(order);
        registrarHistorico(order, anterior, OrderStatus.REJEITADA, user);
    }

    public void resgatar(Long id, User user) {
        Order order = buscarDetalhada(id);
        if (order.getEstado() != OrderStatus.REJEITADA) {
            throw new IllegalStateException("Somente solicitações rejeitadas podem ser resgatadas.");
        }
        OrderStatus anterior = order.getEstado();
        order.setEstado(OrderStatus.APROVADA);
        orderRepository.save(order);
        registrarHistorico(order, anterior, OrderStatus.APROVADA, user);
    }

    public void pagar(Long id, User user) {
        Order order = buscarDetalhada(id);
        if (order.getEstado() != OrderStatus.ARRUMADA) {
            throw new IllegalStateException("Só é possível pagar uma solicitação arrumada.");
        }
        order.setEstado(OrderStatus.PAGA);
        order.setDataHora(LocalDateTime.now());
        orderRepository.save(order);
        registrarHistorico(order, OrderStatus.ARRUMADA, OrderStatus.PAGA, user);
    }

    private void registrarHistorico(Order order, OrderStatus anterior, OrderStatus novo, User user) {
        ChangeHistory changeHistory = new ChangeHistory();
        changeHistory.setOrder(order);
        changeHistory.setEstadoAnterior(anterior);
        changeHistory.setEstadoNovo(novo);
        changeHistory.setDataHora(LocalDateTime.now());
        changeHistoryRepository.save(changeHistory);
    }
    
}