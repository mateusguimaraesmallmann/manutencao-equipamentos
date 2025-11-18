package com.example.back_end.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
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
        LocalDate inicioBase = LocalDate.of(2000, 1, 1);
        LocalDate fimBase = LocalDate.of(2100, 12, 31);

        LocalDateTime inicioDt = (inicio != null) ? inicio.atStartOfDay() : inicioBase.atStartOfDay();
        LocalDateTime fimDt    = (fim    != null) ? fim.atTime(23, 59, 59) : fimBase.atTime(23, 59, 59);

        if (inicioDt.isAfter(fimDt)) {
            LocalDateTime tmp = inicioDt;
            inicioDt = fimDt;
            fimDt = tmp;
        }

        List<EstadoSolicitacao> estadosReceita = Arrays.asList(EstadoSolicitacao.PAGA, EstadoSolicitacao.FINALIZADA
        );

        List<Solicitacao> receitas = solicitacaoRepository
                .findByEstadoInAndOrcamentoValorIsNotNull(estadosReceita);

        Map<LocalDate, BigDecimal> mapa = new TreeMap<>();

        for (Solicitacao s : receitas) {

            LocalDateTime dataReceita = null;

            if (s.getPagaEm() != null) {
                dataReceita = s.getPagaEm();
            } else if (s.getFinalizacaoData() != null) {
                dataReceita = s.getFinalizacaoData();
            } else {
                continue;
            }

            if (dataReceita.isBefore(inicioDt) || dataReceita.isAfter(fimDt)) {
                continue;
            }

            LocalDate dia = dataReceita.toLocalDate();

            BigDecimal valor = (s.getOrcamentoValor() != null)
                    ? s.getOrcamentoValor()
                    : BigDecimal.ZERO;

            mapa.merge(dia, valor, BigDecimal::add);
        }

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<LinhaDiaDTO> resultado = new ArrayList<>();

        for (Map.Entry<LocalDate, BigDecimal> entry : mapa.entrySet()) {
            String diaStr = entry.getKey().format(fmt);
            BigDecimal total = entry.getValue();
            resultado.add(new LinhaDiaDTO(diaStr, total));
        }

        return resultado;
    }

    public List<LinhaCategoriaDTO> gerarRelatorioReceitasPorCategoria() {
        List<EstadoSolicitacao> estadosReceita = Arrays.asList(
                EstadoSolicitacao.PAGA,
                EstadoSolicitacao.FINALIZADA
        );

        List<Solicitacao> receitas = solicitacaoRepository
                .findByEstadoInAndOrcamentoValorIsNotNull(estadosReceita);

        Map<String, BigDecimal> mapa = new HashMap<>();

        for (Solicitacao s : receitas) {
            String categoriaNome = resolveNomeCategoria(s);

            BigDecimal valor = (s.getOrcamentoValor() != null)
                    ? s.getOrcamentoValor()
                    : BigDecimal.ZERO;

            mapa.merge(categoriaNome, valor, BigDecimal::add);
        }

        List<Map.Entry<String, BigDecimal>> entries = new ArrayList<>(mapa.entrySet());
        entries.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        List<LinhaCategoriaDTO> resultado = new ArrayList<>();

        for (Map.Entry<String, BigDecimal> entry : entries) {
            resultado.add(new LinhaCategoriaDTO(entry.getKey(), entry.getValue()));
        }

        return resultado;
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

/*
 * 
 *     public List<LinhaDiaDTO> gerarRelatorioReceitasPorDia(LocalDate inicio, LocalDate fim) {
        LocalDate inicioBase = LocalDate.of(2000, 1, 1);
        LocalDate fimBase = LocalDate.of(2100, 12, 31);

        LocalDateTime inicioDt;
        LocalDateTime fimDt;

        if (inicio != null) {
            inicioDt = inicio.atStartOfDay();
        } else {
            inicioDt = inicioBase.atStartOfDay();
        }

        if (fim != null) {
            fimDt = fim.atTime(23, 59, 59);
        } else {
            fimDt = fimBase.atTime(23, 59, 59);
        }

        if (inicioDt.isAfter(fimDt)) {
            LocalDateTime tmp = inicioDt;
            inicioDt = fimDt;
            fimDt = tmp;
        }

        List<Solicitacao> finalizadas = solicitacaoRepository
                .findByEstadoAndOrcamentoValorIsNotNullAndFinalizacaoDataBetween(
                        EstadoSolicitacao.FINALIZADA,
                        inicioDt,
                        fimDt
                );

        Map<LocalDate, BigDecimal> mapa = new TreeMap<>();

        for (Solicitacao s : finalizadas) {
            LocalDate dia;

            if (s.getFinalizacaoData() != null) {
                dia = s.getFinalizacaoData().toLocalDate();
            } else if (s.getCreatedAt() != null) {
                dia = s.getCreatedAt().toLocalDate();
            } else {
                continue;
            }

            BigDecimal valor;
            if (s.getOrcamentoValor() != null) {
                valor = s.getOrcamentoValor();
            } else {
                valor = BigDecimal.ZERO;
            }

            mapa.merge(dia, valor, BigDecimal::add);
        }

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<LinhaDiaDTO> resultado = new ArrayList<>();

        for (Map.Entry<LocalDate, BigDecimal> entry : mapa.entrySet()) {
            String diaStr = entry.getKey().format(fmt);
            BigDecimal total = entry.getValue();
            resultado.add(new LinhaDiaDTO(diaStr, total));
        }

        return resultado;
    }

    public List<LinhaCategoriaDTO> gerarRelatorioReceitasPorCategoria() {
        List<Solicitacao> finalizadas = solicitacaoRepository
                .findByEstadoAndOrcamentoValorIsNotNull(EstadoSolicitacao.FINALIZADA);

        Map<String, BigDecimal> mapa = new HashMap<>();

        for (Solicitacao s : finalizadas) {
            String categoriaNome = resolveNomeCategoria(s);

            BigDecimal valor;
            if (s.getOrcamentoValor() != null) {
                valor = s.getOrcamentoValor();
            } else {
                valor = BigDecimal.ZERO;
            }

            mapa.merge(categoriaNome, valor, BigDecimal::add);
        }

        List<Map.Entry<String, BigDecimal>> entries = new ArrayList<>(mapa.entrySet());
        entries.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        List<LinhaCategoriaDTO> resultado = new ArrayList<>();

        for (Map.Entry<String, BigDecimal> entry : entries) {
            resultado.add(new LinhaCategoriaDTO(entry.getKey(), entry.getValue()));
        }

        return resultado;
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
*/
