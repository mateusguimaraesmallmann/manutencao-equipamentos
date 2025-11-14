package com.example.back_end.controllers;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/funcionario")
    public ResponseEntity<List<SolicitacaoFuncionarioResumoDTO>> buscarSolicitacoesFuncionario(
        @RequestParam(name = "modo", required = false, defaultValue = "TODAS") String modo,
        @RequestParam(name = "inicio", required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
        @RequestParam(name = "fim", required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(solicitacaoService.buscarSolicitacoesFuncionario(modo, inicio, fim));
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity<List<SolicitacaoClienteResumoDTO>> buscarSolicitacoesByCliente(@PathVariable("id")Long idSolicitacao) {
        return ResponseEntity.ok(solicitacaoService.buscarSolicitacoesByCliente(idSolicitacao));
    }

    @GetMapping("/detalhe/cliente/{id}")
    public ResponseEntity<SolicitacaoClienteDetalheDTO> buscarSolicitacaoClientePorId(@PathVariable("id") Long idSolicitacao) {
        return ResponseEntity.ok(solicitacaoService.buscarSolicitacaoClientePorId(idSolicitacao));
    }

    @GetMapping("/detalhe/funcionario/{id}")
    public ResponseEntity<SolicitacaoFuncionarioDetalheDTO> buscarSolicitacaoFuncionarioPorId(@PathVariable("id") Long idSolicitacao) {
        return ResponseEntity.ok(solicitacaoService.buscarSolicitacaoFuncionarioPorId(idSolicitacao));
    }

    @PostMapping
    public ResponseEntity<?> criarSolicitacao(@RequestBody SolicitacaoCreateDTO solicitacaoCreateDTO) {
        this.solicitacaoService.criarSolicitacao(solicitacaoCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/orcamento/{id}")
    public ResponseEntity<Void> registrarOrcamento(@PathVariable("id") Long idSolicitacao, @RequestBody BigDecimal valor) {
        solicitacaoService.registrarOrcamento(idSolicitacao, valor);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/manutencao/{id}")
    public ResponseEntity<Void> registrarManutencao(@PathVariable("id") Long idSolicitacao, @RequestBody EfetuarManutencaoDTO manutencaoDTO) {
        solicitacaoService.registrarManutencao(idSolicitacao, manutencaoDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/redirecionar/{id}")
    public ResponseEntity<Void> redirecionar(@PathVariable("id") Long idSolicitacao, @RequestBody RedirecionarDTO redirecionarDTO) {
        solicitacaoService.redirecionar(idSolicitacao, redirecionarDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/aprovar/{id}")
    public ResponseEntity<Void> aprovar(@PathVariable("id") Long idSolicitacao) {
        solicitacaoService.aprovar(idSolicitacao);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/rejeitar/{id}")
    public ResponseEntity<Void> rejeitar(@PathVariable("id") Long idSolicitacao) {
        solicitacaoService.rejeitar(idSolicitacao);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resgatar/{id}")
    public ResponseEntity<Void> resgatar(@PathVariable("id") Long idSolicitacao) {
        solicitacaoService.resgatar(idSolicitacao);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/pagar/{id}")
    public ResponseEntity<Void> pagar(@PathVariable("id") Long idSolicitacao) {
        solicitacaoService.pagar(idSolicitacao);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/finalizar/{id}")
    public ResponseEntity<Void> finalizar(@PathVariable("id") Long idSolicitacao) {
        solicitacaoService.finalizar(idSolicitacao);
        return ResponseEntity.ok().build();
    }
    
}