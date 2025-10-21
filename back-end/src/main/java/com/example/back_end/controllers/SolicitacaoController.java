package com.example.back_end.controllers;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dtos.request.EfetuarManutencaoDTO;
import com.example.back_end.dtos.request.RedirecionarDTO;
import com.example.back_end.dtos.request.SolicitacaoCreateDTO;
import com.example.back_end.dtos.response.SolicitacaoFuncionarioResumoDTO;
import com.example.back_end.dtos.response.SolicitacaoClienteDetalheDTO;
import com.example.back_end.dtos.response.SolicitacaoClienteResumoDTO;
import com.example.back_end.dtos.response.SolicitacaoFuncionarioDetalheDTO;
import com.example.back_end.services.SolicitacaoService;

@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoController {

    @Autowired
    private SolicitacaoService solicitacaoService;

    @GetMapping("/abertas")
    public ResponseEntity<List<SolicitacaoFuncionarioResumoDTO>> buscarSolicitacoesAbertas() {
        return ResponseEntity.ok(solicitacaoService.buscarSolicitacoesAbertas());
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity<List<SolicitacaoClienteResumoDTO>> buscarSolicitacoesByCliente(@PathVariable Long idSolicitacao) {
        return ResponseEntity.ok(solicitacaoService.buscarSolicitacoesByCliente(idSolicitacao));
    }

    @GetMapping("/detalhe/cliente/{id}")
    public ResponseEntity<SolicitacaoClienteDetalheDTO> buscarSolicitacaoClientePorId(@PathVariable Long idSolicitacao) {
        return ResponseEntity.ok(solicitacaoService.buscarSolicitacaoClientePorId(idSolicitacao));
    }

    @GetMapping("/detalhe/funcionario/{id}")
    public ResponseEntity<SolicitacaoFuncionarioDetalheDTO> buscarSolicitacaoFuncionarioPorId(@PathVariable Long idSolicitacao) {
        return ResponseEntity.ok(solicitacaoService.buscarSolicitacaoFuncionarioPorId(idSolicitacao));
    }

    @PostMapping
    public ResponseEntity<?> criarSolicitacao(@RequestBody SolicitacaoCreateDTO solicitacaoCreateDTO) {
        this.solicitacaoService.criarSolicitacao(solicitacaoCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/orcamento/{id}")
    public ResponseEntity<Void> registrarOrcamento(@PathVariable Long idSolicitacao, @RequestBody BigDecimal valor) {
        solicitacaoService.registrarOrcamento(idSolicitacao, valor);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/manutencao/{id}")
    public ResponseEntity<Void> registrarManutencao(@PathVariable Long idSolicitacao, @RequestBody EfetuarManutencaoDTO manutencaoDTO) {
        solicitacaoService.registrarManutencao(idSolicitacao, manutencaoDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/redirecionar/{id}")
    public ResponseEntity<Void> redirecionar(@PathVariable Long idSolicitacao, @RequestBody RedirecionarDTO redirecionarDTO) {
        solicitacaoService.redirecionar(idSolicitacao, redirecionarDTO);
        return ResponseEntity.ok().build();
    }

    /*@PostMapping("/{id}/rejeitar")
    public ResponseEntity<Void> rejeitar(@PathVariable Long id, @RequestBody String motivo, @AuthenticationPrincipal User usuario) {
        solicitacaoService.rejeitar(id, motivo, usuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/resgatar")
    public ResponseEntity<Void> resgatar(@PathVariable Long id, @AuthenticationPrincipal User usuario) {
        solicitacaoService.resgatar(id, usuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/pagar")
    public ResponseEntity<Void> pagar(@PathVariable Long id, @AuthenticationPrincipal User usuario) {
        solicitacaoService.pagar(id, usuario);
        return ResponseEntity.ok().build();
    }*/
    
}