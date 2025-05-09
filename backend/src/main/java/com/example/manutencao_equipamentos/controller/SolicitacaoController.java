package com.example.manutencao_equipamentos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.manutencao_equipamentos.Enums.EstadoSolicitacaoEnum;
import com.example.manutencao_equipamentos.model.Cliente;
import com.example.manutencao_equipamentos.model.Solicitacao;
import com.example.manutencao_equipamentos.services.SolicitacaoService;

public class SolicitacaoController {

    @Autowired
    private SolicitacaoService solicitacaoService;

    @GetMapping("/cliente")
    public List<Solicitacao> listarPorCliente(@AuthenticationPrincipal Cliente cliente) {
        return solicitacaoService.listarPorCliente(cliente.getId());
    }

    @GetMapping("/estado/{estado}")
    public List<Solicitacao> listarPorEstado(@PathVariable EstadoSolicitacaoEnum estado) {
        return solicitacaoService.listarPorEstado(estado);
    }

    @PostMapping("/abrir")
    public ResponseEntity<Solicitacao> abrir(@RequestBody Solicitacao solicitacao, @AuthenticationPrincipal Cliente cliente) {
        Solicitacao salva = solicitacaoService.abrirSolicitacao(solicitacao, cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }
    
}
