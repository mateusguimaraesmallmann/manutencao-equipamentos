package com.example.back_end.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.models.Solicitacao;
import com.example.back_end.models.User;
import com.example.back_end.services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Solicitacao> criarSolicitacao(@RequestBody Solicitacao solicitacao) {
        Solicitacao nova = orderService.criarSolicitacao(solicitacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(nova);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitacao> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.buscarDetalhada(id));
    }

    @PostMapping("/{id}/aprovar")
    public ResponseEntity<Void> aprovar(@PathVariable Long id, @AuthenticationPrincipal User usuario) {
        orderService.aprovar(id, usuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/rejeitar")
    public ResponseEntity<Void> rejeitar(@PathVariable Long id, @RequestBody String motivo, @AuthenticationPrincipal User usuario) {
        orderService.rejeitar(id, motivo, usuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/resgatar")
    public ResponseEntity<Void> resgatar(@PathVariable Long id, @AuthenticationPrincipal User usuario) {
        orderService.resgatar(id, usuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/pagar")
    public ResponseEntity<Void> pagar(@PathVariable Long id, @AuthenticationPrincipal User usuario) {
        orderService.pagar(id, usuario);
        return ResponseEntity.ok().build();
    }
    
}