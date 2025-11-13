package com.example.back_end.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.dtos.response.LinhaCategoriaDTO;
import com.example.back_end.dtos.response.LinhaDiaDTO;
import com.example.back_end.services.RelatorioService;
import com.example.back_end.services.SolicitacaoService;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/receitas-por-dia")
    public List<LinhaDiaDTO> receitasPorDia(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {

        return relatorioService.gerarRelatorioReceitasPorDia(inicio, fim);
    }

    @GetMapping("/receitas-por-categoria")
    public List<LinhaCategoriaDTO> receitasPorCategoria() {
        return relatorioService.gerarRelatorioReceitasPorCategoria();
    }

}