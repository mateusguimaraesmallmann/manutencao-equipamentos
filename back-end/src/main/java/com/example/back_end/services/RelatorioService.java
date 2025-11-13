package com.example.back_end.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.response.LinhaCategoriaDTO;
import com.example.back_end.dtos.response.LinhaDiaDTO;
import com.example.back_end.enums.EstadoSolicitacao;
import com.example.back_end.models.Category;
import com.example.back_end.models.Solicitacao;
import com.example.back_end.repositorys.SolicitacaoRepository;

@Service
public class RelatorioService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    public List<LinhaDiaDTO> gerarRelatorioReceitasPorDia(LocalDate inicio, LocalDate fim) {
        LocalDateTime inicioDt = inicio != null ? inicio.atStartOfDay() : LocalDateTime.MIN;
        LocalDateTime fimDt = fim != null ? fim.atTime(23, 59, 59) : LocalDateTime.MAX;

        List<Solicitacao> pagas = solicitacaoRepository
                .findByEstadoAndOrcamentoValorIsNotNullAndPagaEmBetween(EstadoSolicitacao.PAGA, inicioDt, fimDt);

        Map<LocalDate, BigDecimal> mapa = new TreeMap<>();
        for (Solicitacao s : pagas) {
            LocalDate dia = s.getPagaEm() != null
                    ? s.getPagaEm().toLocalDate()
                    : s.getCreatedAt().toLocalDate();

            BigDecimal valor = s.getOrcamentoValor() != null ? s.getOrcamentoValor() : BigDecimal.ZERO;
            mapa.merge(dia, valor, BigDecimal::add);
        }

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return mapa.entrySet().stream()
                .map(e -> new LinhaDiaDTO(e.getKey().format(fmt), e.getValue())).toList();
    }

    public List<LinhaCategoriaDTO> gerarRelatorioReceitasPorCategoria() {
        List<Solicitacao> pagas = solicitacaoRepository
                .findByEstadoAndOrcamentoValorIsNotNull(EstadoSolicitacao.PAGA);

        Map<String, BigDecimal> mapa = new HashMap<>();
        for (Solicitacao s : pagas) {
            String categoria = resolveNomeCategoria(s);
            BigDecimal valor = s.getOrcamentoValor() != null ? s.getOrcamentoValor() : BigDecimal.ZERO;
            mapa.merge(categoria, valor, BigDecimal::add);
        }

        return mapa.entrySet().stream()
                .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                .map(e -> new LinhaCategoriaDTO(e.getKey(), e.getValue()))
                .toList();
    }

    private String resolveNomeCategoria(Solicitacao s) {
        Category cat = s.getCategoria();

        if (cat == null) {
            return "Sem categoria";
        }

        String nome = cat.getNome();
        if (nome == null || nome.isBlank()) {
            return "Sem categoria";
        }
        return nome;
    }
    
}